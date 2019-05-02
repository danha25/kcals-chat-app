import MessageType from './MessageType';
export default interface Message {
    type: MessageType;
    to: string;
    from: string;
    text: string;
}
