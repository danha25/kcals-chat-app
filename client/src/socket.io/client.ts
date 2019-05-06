import { EVENT_DIRECT_MESSAGE } from './../../../common/src/Events';
import { Vue } from "vue-property-decorator";
import * as socketIO from 'socket.io-client';

import * as EVENT from 'kcals-common/lib/Events';
import User from 'kcals-common/lib/User';
import Message from 'kcals-common/lib/Message';
import Channel from 'kcals-common/lib/Channel';
import Emmiters from './emitters';

export default class SocketIOClient {
    private url: string = process.env.SOCKET_IO_URL || 'http://localhost:3000';
    private socket: any;
    private vue: Vue;

    private emitters: Emmiters;

    constructor(vue: Vue) {
        this.vue = vue;
        this.socket = socketIO.connect(this.url);

        this.emitters = new Emmiters(this.socket);

        let urlParams = new URLSearchParams(window.location.search);
        let username: string= urlParams.get('username') || "";

        this.socket.on("connect", () => {
            this.socket.emit(EVENT.EVENT_LOGIN, username);
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

    public getEmitters(): Emmiters {
        return this.emitters;
    }

    public newChannelMessage(userId: string, channelId: string, content: string): void{
        const message: Message =  {
            id: 'id'+content,
            userId: userId,
            toUserId: '',
            toChannelId: channelId,
            toNamespaceId: '1',
            content: content,
            timestamp: new Date()
        }
        this.socket.emit(EVENT.EVENT_CHANNEL_MESSAGE, message, () => {
            // confirmation?
        });
    }



    public newDirectMessage(userId: string, toUserId: string, content: string): void{
        const message: Message =  {
            id: 'id'+content,
            userId: userId,
            toUserId: toUserId,
            toChannelId: "",
            toNamespaceId: '1',
            content: content,
            timestamp: new Date()
        }
        this.socket.emit(EVENT.EVENT_DIRECT_MESSAGE, message, () => {
            // confirmation?
        });
    }

}