import net from 'net'
import { argv, log } from '../common/utils'
import readlLine from 'readline'
import fs from 'fs'
import path from 'path'

class FtpClient {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.dataSocketOn = '';
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
            if (this.dataSocketOn === "STOR") {
                this.dataSend(data.toString(), this.filePath);
                this.dataSocketOn = ''
            } else if(this.dataSocketOn === "RETR") {
                this.dataReceive(data.toString(), this.filePath);
                this.dataSocketOn = ''
            }
            else {
                log(data.toString(), "yellow")
                this.prompt();
            }
            
        })
        this.socket.on('end', () => {
            log('Client disconnected', 'cyan');
            process.exit(0)
        })

        this.socket.on('error', (e => {
            log(e,'red');
            process.exit(0)
        }))
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
                this.dataSocketOn = 'STOR'
                this.socket.write(input)
            }else if (cmd.toUpperCase() === "RETR") {
                const filepath = path.join(process.cwd(), filename)
                this.filePath = filepath
                this.dataSocketOn = 'RETR'
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
            log('Client connected to dataServer', "cyan");
            const rStream = fs.createReadStream(filepath);

            rStream.on('data', (data) => {
                this.dataSocket.write(data);
            })

            rStream.on('end', () => {
                log('Client disconnected to dataServer', "cyan");
                this.dataSocket.end();
            })
        })
        this.dataSocket.on('error', (error) => {
            log(error, 'red')
        })
    }

    dataReceive (dataPort, filepath) {
        this.dataSocket = net.createConnection({
            port: dataPort,
            host: this.host
        }, () => {
            log('Client connected to dataServer', "cyan");
            const wStream = fs.createWriteStream(filepath);

            this.dataSocket.on('data', (data) => {
                wStream.write(data);
                log("File received", "cyan")
                this.dataSocket.end();
            })

            this.dataSocket.on('end', () => {
                log('Client disconnected to dataServer', "cyan");
                wStream.end();
            })
            
        })
        this.dataSocket.on('error', (error) => {
            log(error, 'red')
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