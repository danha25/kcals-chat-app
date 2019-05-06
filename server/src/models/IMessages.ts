'use strict'
import Message from 'kcals-common/lib/Message';

export default interface IMessages {
    createMessage(userId: string, toChannelId: string, toUserId: string, namespaceId: string, content: string, timestamp: Date): Message;
    getChannelMessages(channelId: string): Array<Message>;
    getUserMessages(user1Id: string, user2Id: string, namespaceId: string): Array<Message>;
    getAllMessages(): Array<Message>;
}