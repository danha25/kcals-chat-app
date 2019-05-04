import * as types from './mutation-types';
import User from 'kcals-common/lib/User';
import Channel from 'kcals-common/lib/Channel';

const mutations = {
    [types.UPDATE_USER_LIST](state: any, payload: Array<User>) {
        state.users = payload;
    },
    [types.UPDATE_CHANNEL_LIST](state: any, payload: Array<Channel>) {
        state.channels = payload;
    }
}

export default mutations;