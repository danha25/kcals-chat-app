'use strict'

export default interface Message {
    id: string,
    userId: string,
    toChannelId: string,
    toUserId: string,
    toNamespaceId: string,
    content: string,
    timestamp: Date
}