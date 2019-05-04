import Message from 'kcals-common/lib/Message';
import * as types from './mutation-types';

const actions = {

    updateMessages({ commit }: { commit: any}, messages: Array<Message>) {
        commit(types.UPDATE_MESSAGES, messages);
    },

    addMessage({commit}: {commit: any}, message: Message){
        // emit new message event
        commit(types.ADD_MESSAGE, message);
    }
}

export default actions;