## <a name='TOC'>🐼 Summary</a>

- [Teams](#teams)
- [Rules](#rules)
- [Overview](#overview)
- [Story](#story)
- [GUI](#gui)
- [Bonus](#bonus)
- [Credits](#credits)

## <a name='teams'>🙈 Teams</a>

These are all randomize teams:

- Louis + Yassine
- Benjamin B + Gabriel
- Ibrahima + Jean Charles
- Marc + Andréa
- Maxime + Charbel
- Quentin + Steeve
- Pierre + Dylan
- Benjamin L + Adrien
- Antoine + Thomas

## <a name='overview'>🦊 Rules</a>

Hi, here are some rules to carry out this story oav;

- You **MUST** create a git repository named `myFtp`
- You **MUST** create a file called `.author` with the fullname of all tream members followed by a newline:
- You **MUST** use oriented object programming
- You **MUST** use at least 2 design patterns
- You **MUST** use github branches [ free workflow ]

```sh
~/codingbad/network/myFtp ❯❯❯ cat -e .author
Majdi Toumi$
Ada Lovelace$
```

> Of course, you can talk about the subject with other developers, peer-learning is
> the key to be a better developer. Don't hesitate to ask questions or help people on
> slack channel

> Don't forget, there is no useless question :-)

You **HAVE TO** return the project as a github URL on Wednesday 25, 1.30PM

## <a name='overview'>🐱 Overview</a>

The purpose of this challenge is to create an FTP client and server.
You **CAN** use any protocol you want [ if interested, you can check and respect the RFCs ]

## <a name='story'>🐨 Story</a>

#### Hi, server

##### Usage

```sh
~/codingbad/network/myFtp ❯❯❯ node myFtpServer.js <port>
```

- `port` is the port number on which the server socket is listening.
  > The server **must** be able to handle several clients at the same time.

#### Yo, client

##### Usage

```sh
~/codingbad/network/myFtp ❯❯❯ node myFtpClient.js <host> <port>
```

- host is the name (or the IP address) of the computer where the server is hosted.
- `port` is the port number on which the server is listening.

#### Commands

The client must handle the following commands:

- `USER <username>`: check if the user exist
- `PASS <password>`: authenticate the user with a password
- `LIST`: list the current directory of the server
- `CWD <directory>`: change the current directory of the server
- `RETR <filename>`: transfer a copy of the file _FILE_ from the server to the client
- `STOR <filename>`: transfer a copy of the file _FILE_ from the client to the server
- `PWD`: display the name of the current directory of the server
- `HELP`: send helpful information to the client
- `QUIT`: close the connection and stop the program

#### Requirements

The client must match the following requirements:

- Display a specific prompt to differentiate it from the shell
- Handle the file system security to not allow a user to browse a forbidden directory

## <a name='gui'>🦋 GUI</a>

Well, let use [**Electron**](https://electronjs.org) to have a modern client :)

> If your CLI client is well designed, you already have all functions and you'll focus on GUI.

## <a name='bonus'>🦄 Bonus</a>

In bulk:

- lcd + lpwd + lls commands
- mget + mput commands
- handle the "bin" and "asc" modes
- completion for get and put commands
- Compliance with the RFC
- Mobile client

## <a name='credits'>🦁 Credits</a>

Craft with :heart: by [**Majdi Toumi**](http://majdi.im) in **Paris**.