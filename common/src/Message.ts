'use strict'
import MessageType from './MessageType';

export default interface Message {
    type: MessageType;
    to: string,     // channel name or username
    from: string,   // username
    text: string,
}