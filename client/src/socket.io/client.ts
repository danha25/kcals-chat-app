import { Vue } from "vue-property-decorator";
import socketIO from 'socket.io-client';

import * as EVENT from 'kcals-common/lib/Events';
import User from 'kcals-common/lib/User';
import Message from 'kcals-common/lib/Message';
import Channel from 'kcals-common/lib/Channel';
import { GET_CHANNELS, GET_USERS } from '../../../common/src/Events';


export default class SocketIOClient {
    private url: string = process.env.SOCKET_IO_URL || 'http://localhost:3000';
    private socket: any;
    private vue: Vue;

    constructor(vue: Vue) {
        this.vue = vue;
        this.socket = socketIO(this.url);

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
}