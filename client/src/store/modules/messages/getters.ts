import Message from '../../../../node_modules/kcals-common/lib/Message';

const getters = {
    getMessages: (state: any, username: string) => {
        return state.messages.filter(
            (message: Message) => {message.to === username || message.from === username})
    }
}

export default getters;