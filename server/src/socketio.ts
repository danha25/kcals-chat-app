import * as http from 'http';
import * as socketIO from 'socket.io'


import User from 'kcals-common/lib/User';
import Channel from 'kcals-common/lib/Channel';
import * as EVENT from 'kcals-common/lib/Events';
import Users from './models/Users';
import Messages from './models/Messages';
import Channels from './models/Channels';
import NamespaceUsers from './models/Namespaces_Users';
import Message from 'kcals-common/lib/Message';

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
                socket.emit(EVENT.GET_MESSAGES, this.messages.getAllMessages());
            });

            // logout
            // socket.on(EVENT.EVENT_LOGOUT, (params: any) => {
            //     this.userDisconnected(socket)
            // });

            // New Channel Message
            socket.on(EVENT.EVENT_CHANNEL_MESSAGE, (message: Message, callback) => {
                this.messages.createMessage(message.userId, message.toChannelId, message.toUserId, message.toNamespaceId, message.content);
                this.io.emit(EVENT.GET_MESSAGES, this.messages.getAllMessages());
                callback();
            });

            // New Direct Message
            socket.on(EVENT.EVENT_DIRECT_MESSAGE, (message: Message, callback) => {
                this.messages.createMessage(message.userId, message.toChannelId, message.toUserId, message.toNamespaceId, message.content);
                this.io.emit(EVENT.GET_MESSAGES, this.messages.getAllMessages());
                callback();
            });
        });
    }
}