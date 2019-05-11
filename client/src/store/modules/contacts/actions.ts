import User from 'kcals-common/lib/User';
import Channel from 'kcals-common/lib/Channel';
import * as types from './mutation-types';

const actions = {
    updateUserList({ commit }: { commit: any }, userList: Array<User>) {
        commit(types.UPDATE_USER_LIST, userList);
    },

    updateChannelList({ commit }: { commit: any }, channelList: Array<Channel>) {
        commit(types.UPDATE_CHANNEL_LIST, channelList);
    }
}

export default actions;