## <a name='TOC'>🐼 Summary</a>

- [Team](#team)
- [Launcher](#launcher)

## <a name='team'>🙈 Team</a>
- Marc + Andréa

## <a name='launcher'>🦊 launcher</a>
 For start the server you have to :
 ```sh
 npm run start:server <port>
```

For start the client you have to :
 ```sh
 npm run start:client <host> <port>
```

#### Commands

The client must handle the following commands:

- [X] `USER <username>`: check if the user exist
- [X] `PASS <password>`: authenticate the user with a password
- [X] `LIST`: list the current directory of the server
- [X] `CWD <directory>`: change the current directory of the server
- [X] `RETR <filename>`: transfer a copy of the file _FILE_ from the server to the client
- [X] `STOR <filename>`: transfer a copy of the file _FILE_ from the client to the server
- [X] `PWD`: display the name of the current directory of the server
- [X] `HELP`: send helpful information to the client
- [X] `QUIT`: close the connection and stop the program