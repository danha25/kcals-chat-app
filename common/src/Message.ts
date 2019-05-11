'use strict'

export default interface Message {
    id?: number,
    userId?: number,
    toChannelIdCopy?: number,
    toUserIdCopy?: number,
    content: string,
    createdAt?: Date
}