'use strict'
import Message from 'kcals-common/lib/Message';
import IMessage from './IMessages';

export default class Messages implements IMessage {

    private messages: Array<Message>;

    constructor() {
        this.messages = new Array<Message>();
        this.messages.push({
            id: '1',
            userId: '1',
            toChannelId: undefined,
            toUserId: '2',
            toNamespaceId: '1',
            content: 'message1',
            timestamp: new Date()
        });
        this.messages.push({
            id: '2',
            userId: '1',
            toChannelId: '1',
            toUserId: undefined,
            toNamespaceId: '1',
            content: 'message2',
            timestamp: new Date()
        });
        this.messages.push({
            id: '3',
            userId: '2',
            toChannelId: undefined,
            toUserId: '1',
            toNamespaceId: '1',
            content: 'message3',
            timestamp: new Date()
        });
        this.messages.push({
            id: '4',
            userId: '3',
            toChannelId: '2',
            toUserId: undefined,
            toNamespaceId: '1',
            content: 'message4',
            timestamp: new Date()
        });
    }

    public createMessage(userId: string, toChannelId: string, toUserId: string, namespaceId: string, content: string, timestamp: Date): Message {
        const newMessage: Message = {
            id: 'id' + content,
            userId: userId,
            toChannelId: toChannelId,
            toUserId: toUserId,
            toNamespaceId: namespaceId,
            content: content,
            timestamp: timestamp
        }
        this.messages.push(newMessage);
        return newMessage;
    }
    public getChannelMessages(channelId: string): Message[] {
        return this.messages.filter((msg) => msg.toChannelId === channelId);
    }
    public getUserMessages(user1Id: string, user2Id: string, namespaceId: string): Message[] {
        return this.messages.filter((msg) => (msg.userId === user1Id && msg.toUserId === user2Id && msg.toNamespaceId === namespaceId) || (msg.userId === user2Id && msg.toUserId === user1Id && msg.toNamespaceId === namespaceId));
    }

    public getAllMessages(): Array<Message> {
        return this.messages;
    }

}