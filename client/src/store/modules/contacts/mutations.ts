import * as types from './mutation-types';
import User from '../../../../node_modules/kcals-common/User';

const mutations = {
    [types.UPDATE_USER_LIST](state: any, payload: Array<User>) {
        state.users = payload;
    }
}

export default mutations;