import Namespace from 'kcals-common/lib/Namespace';
import Channel from 'kcals-common/lib/Channel';
import User from 'kcals-common/lib/User';
import Message from 'kcals-common/lib/Message';

import DAO from './index';

const namespaceName: string = 'namespace1';

const channelDTO1: Channel = {name: 'channel1'}
const channelDTO2: Channel = {name: 'channel2'}

const userDTO1: User = {username: 'username1', password: 'password1', name: 'name1', email: 'email1@email.com', avatarUrl: 'img/user1.png'}
const userDTO2: User = {username: 'username2', password: 'password2', name: 'name2', email: 'email2@email.com', avatarUrl: 'img/user2.png'}


export async function seedData(dao: DAO) {
    const namespace = await dao.createNamespace(namespaceName);

    const channel1 = await dao.createChannel(channelDTO1, namespace.id);
    const channel2 = await dao.createChannel(channelDTO2, namespace.id);

    const user1 = await dao.createUser(userDTO1, namespace.id);
    const user2 = await dao.createUser(userDTO2, namespace.id);

    // Channel1
    const message1 = await dao.createMessage({userId: user1.id, content: 'message1'}, namespace.id, channel1.id, null);
    const message2 = await dao.createMessage({userId: user2.id, content: 'message2'}, namespace.id, channel1.id, null);
    // Channel2
    const message3 = await dao.createMessage({userId: user2.id, content: 'message3'}, namespace.id, channel2.id, null);
    // Users
    const message4 = await dao.createMessage({userId: user1.id, content: 'message4'}, namespace.id, null, user2.id);
    const message5 = await dao.createMessage({userId: user2.id, content: 'message5'}, namespace.id, null, user1.id);
}