import Message from '../../../../node_modules/kcals-common/lib/Message';

const getters = {
    getMessages: (state: any) => {
        return state.messages
            //(message: Message) => {message.to === username || message.from === username})
    }
}

export default getters;