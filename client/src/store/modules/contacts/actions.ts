import User from '../../../../node_modules/kcals-common/lib/User';
import * as types from './mutation-types';

const actions = {
    updateUserList({ commit }: { commit: any}, userList: Array<User>) {
        // axios.get('/api/products').then((response) => {
        //     commit('UPDATE_PRODUCT_ITEMS', response.data)
        // });
        commit(types.UPDATE_USER_LIST, userList);
    }
}

export default actions;