import User from '../../../../node_modules/kcals-common/User';
import * as types from './mutation-types';

const actions = {
    updateUserList({ commit }: { commit: any}, userList: Array<User>) {
        // axios.get('/api/products').then((response) => {
        //     commit('UPDATE_PRODUCT_ITEMS', response.data)
        // });
        // const users = new Array<User>();
        // users.push({
        //     id: 'qwerty',
        //     username: 'aaa',
        //     room: 'room1'
        // });
        // users.push({
        //     id: 'asdfgh',
        //     username: 'bbb',
        //     room: 'room1'
        // })
        commit(types.UPDATE_USER_LIST, userList);
    }
}

export default actions;