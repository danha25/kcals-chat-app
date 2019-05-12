import { Sequelize, Op } from 'sequelize';
import { createModels } from './DbFactory';
import { DbInterface } from './typings/DbInterface';

import Namespace from 'kcals-common/lib/Namespace';
import Channel from 'kcals-common/lib/Channel';
import User from 'kcals-common/lib/User';
import Message from 'kcals-common/lib/Message';


export default class DAO {

    private db: DbInterface;

    constructor(sequelizeConfig: any) {
        this.db = createModels(sequelizeConfig);
        this.db.sequelize.sync(); // tells Sequelize to sync all defined models to db
    }

    public async createNamespace(name: string): Promise<Namespace> {
        const namespace = await this.db.Namespace.create({ name: name });
        return { id: namespace.id, name: namespace.name }
    }

    public async getNamespace(id: number): Promise<Namespace> {
        const namespace = await this.db.Namespace.findById(id);
        return { id: namespace.id, name: namespace.name };
    }

    public async getNamespaceByName(name: string): Promise<Namespace> {
        const namespace = await this.db.Namespace.findOne({where: {name: name}});
        return { id: namespace.id, name: namespace.name };
    }

    public async createChannel(channelDTO: Channel, namespaceId: number): Promise<Channel> {
        // check if namespace exists
        let newChannel = await this.db.Channel.create(channelDTO);
        newChannel = await newChannel.update({
            namespaceId: namespaceId
        });
        return { id: newChannel.id, name: newChannel.name }
    }

    public async getChannel(id: number): Promise<Channel> {
        const channel = await this.db.Channel.findById(id);
        return { id: channel.id, name: channel.name }
    }

    public async getChannels(namespaceId: number): Promise<Array<Channel>> {
        const channels = await this.db.Channel.findAll({where: { namespaceId: namespaceId}});
        return this.convertChannelsToDTO(channels);
    }

    public async createUser(user: User, namespaceId: number): Promise<User> {
        let newUser = await this.db.User.create(user);
        newUser = await newUser.update({
            namespaceId: namespaceId
        });
        return { id: newUser.id, username: newUser.username, password: newUser.password, name: newUser.name, email: newUser.email, avatarUrl: newUser.avatarUrl }
    }

    public async getUser(id: number): Promise<User> {
        let user = await this.db.User.findById(id);
        return { id: user.id, username: user.username, password: user.password, name: user.name, email: user.email, avatarUrl: user.avatarUrl }
    }

    public async getUserByName(username: string): Promise<User> {
        let user = await this.db.User.findOne({where: {username: username}});
        return { id: user.id, username: user.username, password: user.password, name: user.name, email: user.email, avatarUrl: user.avatarUrl }
    }

    public async getUsers(namespaceId: number): Promise<Array<User>> {
        let users = await this.db.User.findAll({where: {namespaceId: namespaceId}});
        return users;
    }

    public async setUserOnline(userId: number, online: boolean) {
        let user = await this.db.User.findById(userId);
        user.online = online;
        await user.save();
    }

    public async createMessage(message: Message, namespaceId: number, toChannelId: number, toUserId: number): Promise<Message> {
        let newMessage = await this.db.Message.create(message);
        newMessage = await newMessage.update({
            namespaceId: namespaceId,
            toChannelId: toChannelId,
            toUserId: toUserId
        });
        return { id: newMessage.id, userId: newMessage.userId, content: newMessage.content }
    }

    public async getChannelMessages(channelId: number): Promise<Array<Message>> {
        const messages = await this.db.Message.findAll({
            where: {
                toChannelId: channelId
            }
        });
        return this.convertMessagesToDTO(messages);
    }

    public async getUsersMessages(userId1: number, userId2: number): Promise<Array<Message>> {
        const messages = await this.db.Message.findAll({
            where: {
                [Op.or]: [{ [Op.and]: { userId: userId1, toUserId: userId2 } }, { [Op.and]: { userId: userId2, toUserId: userId1 } }]
            }
        });

        return this.convertMessagesToDTO(messages);
    }

    private convertChannelsToDTO(channels: Array<Channel>): Array<Channel> {
        let channelsDTO = channels.map((channel) => {
            return {id: channel.id, name: channel.name}
        });
        return channelsDTO;
    }

    private convertUsersToDTO(users: Array<User>): Array<User> {
        let usersDTO = users.map((user) => {
            return {id: user.id, username: user.username, password: user.password, name: user.name, email: user.email, avatarUrl: user.avatarUrl}
        });
        return usersDTO;
    }

    private convertMessagesToDTO(messages: Array<any>): Array<Message> {
        let messagesDTO = messages.map((message) => {
            return { id: message.id, userId: message.userId, content: message.content, createdAt: message.createdAt, toUserIdCopy: message.toUserId, toChannelIdCopy: message.toChannelId }
        });
        return messagesDTO;
    }
}
