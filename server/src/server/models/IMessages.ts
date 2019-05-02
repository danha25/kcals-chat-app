'use strict'
import Message from './Message';

export default interface IMessages {
    getDirectMessages(from: string, to: string): Array<Message>;
    getChannelMessages(channel: string): Array<Message>;
    saveMessage(message: Message): Message;
}