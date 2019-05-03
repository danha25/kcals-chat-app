import Message from '../../../../node_modules/kcals-common/lib/Message';
import * as types from './mutation-types';

const actions = {

    updateMessages({ commit }: { commit: any}, messages: Array<Message>) {
        commit(types.UPDATE_MESSAGES, messages);
    },

    addMessage({commit}: {commit: any}, message: Message){
        commit(types.ADD_MESSAGE, message);
    }
}

export default actions;