import { Vue } from "vue-property-decorator";
import * as socketIO from 'socket.io-client';

import * as EVENT from 'kcals-common/lib/Events';
import Namespace from 'kcals-common/lib/Namespace';
import User from 'kcals-common/lib/User';
import Message from 'kcals-common/lib/Message';
import Channel from 'kcals-common/lib/Channel';

export default class SocketIOClient {
    private url: string = process.env.SOCKET_IO_URL || 'http://localhost:3000';
    private socket: any;
    private vue: Vue;

    constructor(vue: Vue) {
        this.vue = vue;
        this.socket = socketIO.connect(this.url);

        const username: string = localStorage.getItem('username') || '';
        const namespace: string = localStorage.getItem('namespace') || '';

        this.socket.on("connect", () => {
            this.socket.emit(EVENT.EVENT_LOGIN, { username: username, namespaceName: namespace }, (namespace: Namespace) => {
                const namespaceId = new Number(namespace.id);
                localStorage.setItem('namespaceId', namespaceId.toString());
            });
        });

        this.setListeners();
    }

    private setListeners() {
        this.socket.on(EVENT.GET_CHANNELS, (channels: Array<Channel>) => {
            this.vue.$store.dispatch('updateChannelList', channels);
        });

        this.socket.on(EVENT.GET_USERS, (users: Array<User>) => {
            this.vue.$store.dispatch('updateUserList', users);
        });

        this.socket.on(EVENT.GET_MESSAGES, (messages: Array<Message>) => {
            this.vue.$store.dispatch('updateMessages', messages);
        });
    }

    public newChannelMessage(userId: number, channelId: number, content: string): void {
        const namespaceId = localStorage.getItem('namespaceId');
        const message: Message = {
            userId: userId,
            toChannelIdCopy: channelId,
            content: content,
        }
        this.socket.emit(EVENT.EVENT_CHANNEL_MESSAGE, { message: message, namespaceId: namespaceId }, () => {
            // confirmation?
        });
    }



    public newDirectMessage(userId: number, toUserId: number, content: string): void {
        const namespaceId = localStorage.getItem('namespaceId');
        const message: Message = {
            userId: userId,
            toUserIdCopy: toUserId,
            content: content,
        }
        this.socket.emit(EVENT.EVENT_DIRECT_MESSAGE, { message: message, namespaceId: namespaceId }, () => {
            // confirmation?
        });
    }

    public logout(): void {
        const username = localStorage.getItem('username');
        const namespace = localStorage.getItem('namespace');
        this.socket.emit(EVENT.EVENT_LOGOUT, { username: username, namespace:namespace});
    }

}