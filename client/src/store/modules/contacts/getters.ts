import User from 'kcals-common/lib/User';

const getters = {
    users: (state: any) => state.users,
    user: (state: any) => (username: string) => {
        return state.users.filter((user: User) => user.username === username)[0];
    },
    channels: (state:any) => state.channels
}

export default getters;