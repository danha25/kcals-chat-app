'use strict'

import MessageType from './MessageType';
import Message from './Message';
import IMessage from './IMessages';

export default class Messages implements IMessage {

    private messages: Array<Message>;

    constructor() {
        this.messages = new Array();
    }

    public getDirectMessages(from: string, to: string): Array<Message> {
        return this.messages.filter((message: Message) =>
            message.type === MessageType.DIRECT
            &&
            ((message.to === to && message.from === from) || (message.to === from && message.from === to)));

    }
    public getChannelMessages(channel: string): Array<Message> {
        return this.messages.filter((message: Message) => message.type === MessageType.CHANNEL && message.to === channel);
    }
    public saveMessage(message: Message): Message {
        this.messages.push(message);
        return message;
    }
}