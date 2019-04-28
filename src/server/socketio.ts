import * as http from 'http';
import * as socketIO from 'socket.io'

import User from './models/User';
import Users from './models/Users';

const EVENT_UPDATE_USERS: string = 'updateUsers';
const EVENT_NEW_MESSAGE: string = 'newMessage';

export default class MySocketIO {

    public io: socketIO.Server;
    private users: Users;

    constructor(server: http.Server) {
        this.io = socketIO(server);
        this.users = new Users();

        this.io.on('connection', (socket) => {
            // Join
            socket.on('join', (params: any) => {
                this.newUserJoined(socket, params.username, params.room);
            });

            // Disconnect
            socket.on('disconnect', (params: any) => {
                this.userDisconnected(socket)
            });

            // New Message
            socket.on('createMessage', (message, callback) => {
                this.onCreateMessage(socket, message);
                callback();
            });
        });
    }

    private newUserJoined(socket: socketIO.Socket, username: string, room: string): void {
        socket.join(room);
        const user: User = {
            id: socket.id,
            username: username,
            room: room
        }

        this.users.removeUser(user.id);
        this.users.addUser(user);

        this.io.to(room).emit(EVENT_UPDATE_USERS, this.users.getAllUsers(room));
        console.log(`User: ${user.username} has joined succesfully`);
    }

    private userDisconnected(socket: socketIO.Socket): void {
        const user = this.users.removeUser(socket.id);
        if (user) {
            this.io.to(user.room).emit(EVENT_UPDATE_USERS, this.users.getAllUsers(user.room));
            console.log(`User: ${user.username} has been disconnected`);
        }
    }

    private onCreateMessage(socket: socketIO.Socket, message: any): void {
        const user = this.users.getUser(socket.id);

        if (user) {
            message.user = user.username;
            this.io.to(user.room).emit(EVENT_NEW_MESSAGE, message);
        }
    }
}