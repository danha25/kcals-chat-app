import * as http from 'http';
import * as socketIO from 'socket.io'

import User from 'kcals-common/lib/User';
import Users from './models/Users';
import MessageType  from 'kcals-common/lib/MessageType';
import Message from 'kcals-common/lib/Message';
import Messages from './models/Messages';

// Emit
const EVENT_UPDATE_USERS: string = 'updateUsers';
const EVENT_UPDATE_CHANNELS: string = 'updateChannels';
const EVENT_NEW_MESSAGE: string = 'newMessage';

// Listen
const EVENT_LOGIN: string = 'login';
const EVENT_LOGOUT: string = 'disconnect';
const EVENT_CHANNEL_MESSAGE: string = 'createChannelMessage';
const EVENT_DIRECT_MESSAGE: string = 'createDirectMessage';
const EVENT_FETCH_CHANNEL_MESSAGES: string = 'fetchChannelMessages';
const EVENT_FETCH_DIRECT_MESSAGES: string = 'fetchDirectMessages';


export default class MySocketIO {

    public io: socketIO.Server;
    private users: Users;
    private messages: Messages;

    constructor(server: http.Server) {
        this.io = socketIO(server);
        this.users = new Users();
        this.messages = new Messages();

        this.io.on('connection', (socket) => {
            // login
            socket.on(EVENT_LOGIN, (params: any) => {
                this.newUserJoined(socket, params.username, params.room);
                this.updateChannels(socket, params.room);
            });

            // logout
            socket.on(EVENT_LOGOUT, (params: any) => {
                this.userDisconnected(socket)
            });

            // New Channel Message
            socket.on(EVENT_CHANNEL_MESSAGE, (message: any, callback) => {
                this.onChannelMessage(socket, message);
                callback();
            });

            // New Direct Message
            socket.on(EVENT_DIRECT_MESSAGE, (message: any, callback) => {
                this.onDirectMessage(socket, message);
                callback();
            });

            socket.on(EVENT_FETCH_DIRECT_MESSAGES, (from: any, callback) => {
                const user = this.users.getUserById(socket.id);
                const messages: Array<Message> = this.messages.getDirectMessages(from, user.username);
                callback(messages);
            });

            socket.on(EVENT_FETCH_CHANNEL_MESSAGES, (channel: string, callback) => {
                const messages: Array<Message> = this.messages.getChannelMessages(channel)
                callback(messages);
            });

        });
    }

    private updateChannels(socket: socketIO.Socket, room: string): void {
        const channels: Array<string> = [];
        channels.push(room);
        socket.emit(EVENT_UPDATE_CHANNELS, channels);
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

    // emit message{to(name), text}
    private onChannelMessage(socket: socketIO.Socket, message: any): void {
        const userFrom: User = this.users.getUserById(socket.id);

        if (userFrom) {
            const msg: Message= {
                type: MessageType.CHANNEL,
                from: userFrom.username,
                to: message.to,
                text: message.text,
            }
            this.messages.saveMessage(msg);
            this.io.to(message.to).emit(EVENT_NEW_MESSAGE, msg);
        } else {
            console.log(`user with id:${socket.id} doesn't exist`);
        }
    }

    // emit message{to(name), text}    // emit message{to(name), text}
    private onDirectMessage(socket: socketIO.Socket, msg: any) {
        const userFrom: User = this.users.getUserById(socket.id);
        const userTo: User = this.users.getUserByName(msg.to);

        const directMessage: Message = {
            type: MessageType.DIRECT,
            from: userFrom.username,
            to: userTo.username,
            text: msg.text
        }

        this.messages.saveMessage(directMessage);

        socket.broadcast.to(userTo.id).emit(EVENT_NEW_MESSAGE, directMessage);
        socket.emit(EVENT_NEW_MESSAGE, directMessage );
    }
}