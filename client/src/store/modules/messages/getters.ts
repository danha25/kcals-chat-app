import Message from 'kcals-common/lib/Message';

const getters = {
    messages: (state: any) => {
        return state.messages
    },
    channelMessages: (state: any) => (channelId: string) => {
        return state.messages.filter((message: Message) => { 
            return message.toChannelId === channelId
         });
    },
    userMessages: (state: any) => (userId1: string, userId2: string) => {
        return state.messages.filter((message: Message) => {
            return ((message.userId === userId1 && message.toUserId === userId2)
                ||
                (message.userId === userId2 && message.toUserId === userId1))
        });
    }
}

export default getters;