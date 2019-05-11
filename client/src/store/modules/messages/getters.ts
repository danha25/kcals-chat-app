import Message from 'kcals-common/lib/Message';

const getters = {
    messages: (state: any) => {
        return state.messages
    },
    channelMessages: (state: any) => (channelId: number) => {
        return state.messages.filter((message: Message) => {
            return message.toChannelIdCopy == channelId;
        });
    },
    userMessages: (state: any) => (userId1: number, userId2: number) => {
        return state.messages.filter((message: Message) => {
            return ((message.userId == userId1 && message.toUserIdCopy == userId2)
                ||
                (message.userId == userId2 && message.toUserIdCopy == userId1))
        });
    }
}

export default getters;