import * as http from 'http';
import * as socketIO from 'socket.io'


import User from 'kcals-common/lib/User';
import Channel from 'kcals-common/lib/Channel';
import * as EVENT from 'kcals-common/lib/Events';
import Users from './models/Users';
import Messages from './models/Messages';
import Channels from './models/Channels';
import NamespaceUsers from './models/Namespaces_Users';

export default class MySocketIO {

    public io: socketIO.Server;
    private users: Users;
    private channels: Channels;
    private namespaceUsers: NamespaceUsers;
    private messages: Messages;

    // for now default namespace is '1'
    private DEF_NAMESPACE: string = '1';

    constructor(server: http.Server) {
        this.io = socketIO(server);
        this.users = new Users();
        this.channels = new Channels();
        this.namespaceUsers = new NamespaceUsers();
        this.messages = new Messages();

        this.io.on('connection', (socket) => {
            // login
            socket.on(EVENT.EVENT_LOGIN, (username: string) => {
                // get user data
                const user: User = this.users.getUser(username);

                // send him channels
                const channels: Array<Channel> = this.channels.getChannels(this.DEF_NAMESPACE);
                socket.emit(EVENT.GET_CHANNELS, channels);

                // send him users
                const usersIds: Array<String> = this.namespaceUsers.getUsersIds(this.DEF_NAMESPACE);
                const users = usersIds.map((userId: string) => this.users.getUserById(userId));
                socket.emit(EVENT.GET_USERS, users);

                // send him all messages
               // const channelsMessages: any = channels.map((channel) => this.messages.getChannelMessages(channel.id));
               // const usersMessages: any = users.map((u) => this.messages.getUserMessages(user.id, u.id, this.DEF_NAMESPACE));
                // const userMessages = ...
                //socket.emit(EVENT.GET_MESSAGES, channelsMessages.concat(usersMessages));
                socket.emit(EVENT.GET_MESSAGES, this.messages.getAllMessages());


                // // send him all channel messages

                // // send him all contact messages
                // this.newUserJoined(socket, params.username, params.room);
                // this.updateChannels(socket, params.room);
            });

            // logout
            // socket.on(EVENT.EVENT_LOGOUT, (params: any) => {
            //     this.userDisconnected(socket)
            // });

            // // New Channel Message
            // socket.on(EVENT.EVENT_CHANNEL_MESSAGE, (message: any, callback) => {
            //     this.onChannelMessage(socket, message);
            //     callback();
            // });

            // // New Direct Message
            // socket.on(EVENT.EVENT_DIRECT_MESSAGE, (message: any, callback) => {
            //     this.onDirectMessage(socket, message);
            //     callback();
            // });

            // socket.on(EVENT.EVENT_FETCH_DIRECT_MESSAGES, (from: any, callback) => {
            //     const user = this.users.getUserById(socket.id);
            //     const messages: Array<Message> = this.messages.getDirectMessages(from, user.username);
            //     callback(messages);
            // });

            // socket.on(EVENT.EVENT_FETCH_CHANNEL_MESSAGES, (channel: string, callback) => {
            //     const messages: Array<Message> = this.messages.getChannelMessages(channel)
            //     callback(messages);
            // });

        });
    }

    // private updateChannels(socket: socketIO.Socket, room: string): void {
    //     const channels: Array<string> = [];
    //     channels.push(room);
    //     socket.emit(EVENT.EVENT_UPDATE_CHANNELS, channels);
    // }

    // private newUserJoined(socket: socketIO.Socket, username: string, room: string): void {
    //     socket.join(room);
    //     const user: User = {
    //         id: socket.id,
    //         username: username,
    //         room: room
    //     }

    //     this.users.removeUser(user.id);
    //     this.users.addUser(user);

    //     this.emitUpdateUsers(room);
    //     this.emitMessages(room);

    //     console.log(`User: ${user.username} has joined succesfully`);
    // }

 //   private emitUpdateUsers(room: string) {
    //     this.io.to(room).emit(EVENT.EVENT_UPDATE_USERS, this.users.getAllUsers(room));
    // }

    // private emitMessages(room: string) {
    //     this.io.to(room).emit(EVENT.EVENT_UPDATE_MESSAGES, this.messages.getMessages());
    // }

    // private userDisconnected(socket: socketIO.Socket): void {
    //     const user = this.users.removeUser(socket.id);
    //     if (user) {
    //         this.io.to(user.room).emit(EVENT.EVENT_UPDATE_USERS, this.users.getAllUsers(user.room));
    //         console.log(`User: ${user.username} has been disconnected`);
    //     }
    // }

    // // emit message{to(name), text}
    // private onChannelMessage(socket: socketIO.Socket, message: any): void {
    //     const userFrom: User = this.users.getUserById(socket.id);

    //     if (userFrom) {
    //         const msg: Message= {
    //             type: MessageType.CHANNEL,
    //             from: userFrom.username,
    //             to: message.to,
    //             text: message.text,
    //         }
    //         this.messages.saveMessage(msg);
    //         this.io.to(message.to).emit(EVENT.EVENT_NEW_MESSAGE, msg);
    //     } else {
    //         console.log(`user with id:${socket.id} doesn't exist`);
    //     }
    // }

    // // emit message{to(name), text}    // emit message{to(name), text}
    // private onDirectMessage(socket: socketIO.Socket, msg: any) {
    //     const userFrom: User = this.users.getUserById(socket.id);
    //     const userTo: User = this.users.getUserByName(msg.to);

    //     const directMessage: Message = {
    //         type: MessageType.DIRECT,
    //         from: userFrom.username,
    //         to: userTo.username,
    //         text: msg.text
    //     }

    //     this.messages.saveMessage(directMessage);

    //     socket.broadcast.to(userTo.id).emit(EVENT.EVENT_NEW_MESSAGE, directMessage);
    //     socket.emit(EVENT.EVENT_NEW_MESSAGE, directMessage );
    // }
}