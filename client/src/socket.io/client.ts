import { Vue } from "vue-property-decorator";
import socketIO from 'socket.io-client';

import * as EVENT from 'kcals-common/lib/Events';
import User from 'kcals-common/lib/User';
import Message from 'kcals-common/lib/Message';


export default class SocketIOClient {
    private url: string = process.env.SOCKET_IO_URL || 'http://localhost:3000';
    private socket: any;
    private vue: Vue;

    constructor(vue: Vue) {
        this.vue = vue;
        this.socket = socketIO(this.url);

        let urlParams = new URLSearchParams(window.location.search);
        let username: string= urlParams.get('username') || "";
        let room: string= urlParams.get('room') || "";

        this.socket.on("connect", () => {
            this.socket.emit(EVENT.EVENT_LOGIN, { username, room});
        });

        this.setListeners();
    }

    private setListeners() {
        this.socket.on(EVENT.EVENT_UPDATE_USERS, (users: Array<User>) => {
            this.vue.$store.dispatch('updateUserList', users);
        });

        this.socket.on(EVENT.EVENT_UPDATE_MESSAGES, (messages: Array<Message>) => {
            this.vue.$store.dispatch('updateMessages', messages);
            console.log(messages);
        })
    }
}