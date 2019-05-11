import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';
import {NamespaceAttributes, NamespaceInstance} from './Namespace';
import {ChannelAttributes, ChannelInstance} from './Channel'
import { UserAttributes, UserInstance } from './User';
import Message from 'kcals-common/lib/Message';

export interface MessageAttributes extends Message{
    id?: number;
    content: string;
    updatedAt?: Date;

    namespace?: NamespaceAttributes | NamespaceAttributes['id'];
    user?: UserAttributes | UserAttributes['id'];
    toUser?: UserAttributes | UserAttributes['id'];
    toChannel?: ChannelAttributes | ChannelAttributes['id'];
};

export interface MessageInstance extends Sequelize.Instance<MessageAttributes>, MessageAttributes {
    // NamespaceId
    getNamespace: Sequelize.BelongsToGetAssociationMixin<NamespaceInstance>;
    setNamespace: Sequelize.BelongsToSetAssociationMixin<NamespaceInstance, NamespaceInstance['id']>;
    createNamespace: Sequelize.BelongsToCreateAssociationMixin<NamespaceAttributes>;
    // UserId
    getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
    setUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    createUser: Sequelize.BelongsToCreateAssociationMixin<UserAttributes>;
    // ToUserId
    getToUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
    setToUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    createToUser: Sequelize.BelongsToCreateAssociationMixin<UserAttributes>;
    // ToChannelId
    getToChannel: Sequelize.BelongsToGetAssociationMixin<ChannelInstance>;
    setToChannel: Sequelize.BelongsToSetAssociationMixin<ChannelInstance, ChannelInstance['id']>;
    createToChannel: Sequelize.BelongsToCreateAssociationMixin<ChannelAttributes>;
}

export const MessageFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<MessageInstance, MessageAttributes> => {
    const attributes: SequelizeAttributes<MessageAttributes> = {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };
    const Message = sequelize.define<MessageInstance, MessageAttributes>('Message', attributes);

    Message.associate = models => {
        Message.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
        Message.belongsTo(models.User, { as: 'toUser', foreignKey: 'toUserId' });
        Message.belongsTo(models.Channel, { as: 'toChannel', foreignKey: 'toChannelId' });
        Message.belongsTo(models.Namespace, { as: 'namespace', foreignKey: 'namespaceId' });
    };

    return Message;
}