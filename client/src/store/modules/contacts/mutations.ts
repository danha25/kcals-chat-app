import * as types from './mutation-types';
import User from '@/models/User';

const mutations = {
    [types.UPDATE_USER_LIST](state: any, payload: Array<User>) {
        state.users = payload;
    }
}

export default mutations;