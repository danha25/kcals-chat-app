import * as types from './mutation-types';
import Message from '../../../../node_modules/kcals-common/lib/Message';

const mutations = {
    [types.UPDATE_MESSAGES](state: any, payload: Array<Message>) {
        state.messages = payload;
    },
    [types.ADD_MESSAGE](state: any, payload: Message) {
        state.messages.push(payload);
    }
}

export default mutations;