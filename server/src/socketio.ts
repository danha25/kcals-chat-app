import * as http from 'http';
import * as socketIO from 'socket.io'

import * as EVENT from 'kcals-common/lib/Events';
import Namespace from 'kcals-common/lib/Namespace';
import User from 'kcals-common/lib/User';
import Channel from 'kcals-common/lib/Channel';
import Message from 'kcals-common/lib/Message';

import DAO from './db';

export default class MySocketIO {

    public io: socketIO.Server;
    private dao: DAO;

    constructor(server: http.Server, dao: DAO) {
        this.io = socketIO(server);
        this.dao = dao;

        this.io.on('connection', (socket) => {
            // login
            socket.on(EVENT.EVENT_LOGIN, async (params: any, callback) => {

                const user: User = await this.dao.getUserByName(params.username);
                const namespace: Namespace = await this.dao.getNamespaceByName(params.namespaceName);

                // set online
                await this.dao.setUserOnline(user.id, true);

                // send channels
                const channels: Array<Channel> = await this.dao.getChannels(namespace.id);
                socket.emit(EVENT.GET_CHANNELS, channels);

                // send users - to everyone
                const users: Array<User> = await this.dao.getUsers(namespace.id);
                this.io.emit(EVENT.GET_USERS, users);

                // send user specific namespace messages
                let messages: Array<Message> = await this.getNamespaceMessages(namespace.id, user.id, channels, users);
                socket.emit(EVENT.GET_MESSAGES, messages);

                callback(namespace);
            });

            // New Channel Message
            socket.on(EVENT.EVENT_CHANNEL_MESSAGE, async (params: any, callback) => {
                await this.dao.createMessage(params.message, params.namespaceId, params.message.toChannelIdCopy, null)
                // Temporary - send to everyone
                const channels: Array<Channel> = await this.dao.getChannels(params.namespaceId);
                const users: Array<User> = await this.dao.getUsers(params.namespaceId);
                let messages: Array<Message> = await this.getNamespaceMessages(params.namespaceId, 1, channels, users);

                this.io.emit(EVENT.GET_MESSAGES, messages);
                callback();
            });

            // New Direct Message
            socket.on(EVENT.EVENT_DIRECT_MESSAGE, async (params: any, callback) => {
                await this.dao.createMessage(params.message, params.namespaceId, null, params.message.toUserIdCopy);
                // Temporary - send to everyone
                const channels: Array<Channel> = await this.dao.getChannels(params.namespaceId);
                const users: Array<User> = await this.dao.getUsers(params.namespaceId);
                let messages: Array<Message> = await this.getNamespaceMessages(params.namespaceId, 1, channels, users);

                this.io.emit(EVENT.GET_MESSAGES, messages);
                callback();
            });

            socket.on(EVENT.EVENT_LOGOUT, async (params: any) => {
                // set offline
                const user: User = await this.dao.getUserByName(params.username);
                await this.dao.setUserOnline(user.id, false);

                // send users
                const namespace: Namespace = await this.dao.getNamespaceByName(params.namespace);
                const users: Array<User> = await this.dao.getUsers(namespace.id);
                this.io.emit(EVENT.GET_USERS, users);
            });
        });
    }

    private asyncForEach = async (array: Array<any>, callback: any) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array)
        }
    }
    // Namespace users's specific messages 
    private getNamespaceMessages = async (namespaceId: number, userId: number, channels: Array<Channel>, users: Array<User>): Promise<Array<Message>> => {
        let messages: Array<Message> = new Array<Message>();
        await this.asyncForEach(channels, async (channel: Channel) => {
            let channelMessages = await this.dao.getChannelMessages(channel.id);
            messages = messages.concat(channelMessages);
        });
        await this.asyncForEach(users, async (user: User) => {
            let userMessages = await this.dao.getUsersMessages(userId, user.id);
            messages = messages.concat(userMessages);
        });
        return messages;
    }
}
