import net from 'net'
import { argv, log } from '../common/utils'
import readlLine from 'readline'
import fs from 'fs'
import path from 'path'

class FtpClient {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.dataSocketOn = false;
        this.filePath = '';
    }

    connect() {
        this.socket = net.createConnection({
            port: this.port,
            host: this.host
        }, () => {
            log('Client connected', "cyan");
            this.isReady = true
            this.prompt();
        })
        this.socket.on('data', (data) => {
            if (this.dataSocketOn) {
                this.dataSend(data.toString(), this.filePath);
            }
            this.prompt();
        })
        this.socket.on('end', () => {
            log('Client disconnected', 'cyan');
            process.exit(0)
        })
    }

    prompt() {
        log(">>> ", "white", false);
        const rl = readlLine.createInterface({
            input: process.stdin
        });
        rl.on('line', (input) => {
            const [cmd, filename] = input.split(' ')
            if (cmd.toUpperCase() === 'STOR') {
                const filepath = path.join(process.cwd(), filename)
                if (!fs.existsSync(filepath)) {
                    log("There is no file there", "red")
                    return
                }
                this.filePath = filepath
                this.dataSocketOn = true
                this.socket.write(input)
            } else {
                this.socket.write(input)
                rl.close();
            }
        });
    }

    dataSend (dataPort, filepath) {
        this.dataSocket = net.createConnection({
            port: dataPort,
            host: this.host
        }, () => {
            log('Client connected to dataServer', "magenta");
            const rStream = fs.createReadStream(filepath);

            rStream.on('data', (data) => {
                this.dataSocket.write(data);
            })

            rStream.on('end', () => {
                this.dataSocket.end()
            })
        })
        this.dataSocket.on('error', () => {
            console.log('on error')
        })
    }
}

const args = argv();
if (args.length != 2){
    log("Usage: client.js <host> <port>", "cyan");
    process.exit(0)
}

const [host, port] = args

const client = new FtpClient(host, port)
client.connect()