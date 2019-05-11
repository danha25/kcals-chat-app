import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';
import Channel from 'kcals-common/lib/Channel';
import { NamespaceInstance, NamespaceAttributes } from './Namespace';
import { MessageInstance, MessageAttributes } from './Message';

export interface ChannelAttributes extends Channel{
    createdAt?: Date;
    updatedAt?: Date;

    namespace?: NamespaceAttributes | NamespaceAttributes['id'];
    messages?: Array<MessageAttributes> | Array<MessageAttributes['toChannel']>;
};

export interface ChannelInstance extends Sequelize.Instance<ChannelAttributes>, ChannelAttributes {
    // Namespace
    getNamespace: Sequelize.BelongsToGetAssociationMixin<NamespaceInstance>;
    setNamespace: Sequelize.BelongsToSetAssociationMixin<NamespaceInstance, NamespaceInstance['id']>;
    createNamespace: Sequelize.BelongsToCreateAssociationMixin<NamespaceAttributes>;

    // Messages
    getMessages: Sequelize.HasManyGetAssociationsMixin<MessageInstance>;
    setMessages: Sequelize.HasManySetAssociationsMixin<MessageInstance, MessageInstance['id']>;
    addMessages: Sequelize.HasManyAddAssociationsMixin<MessageInstance, MessageInstance['id']>;
    addMessage: Sequelize.HasManyAddAssociationMixin<MessageInstance, MessageInstance['id']>;
    createMessage: Sequelize.HasManyCreateAssociationMixin<MessageAttributes, MessageInstance>;
    removeMessage: Sequelize.HasManyRemoveAssociationMixin<MessageInstance, MessageInstance['id']>;
    removeMessages: Sequelize.HasManyRemoveAssociationsMixin<MessageInstance, MessageInstance['id']>;
    hasMessage: Sequelize.HasManyHasAssociationMixin<MessageInstance, MessageInstance['id']>;
    hasMessages: Sequelize.HasManyHasAssociationsMixin<MessageInstance, MessageInstance['id']>;
    countMessages: Sequelize.HasManyCountAssociationsMixin;
}

export const ChannelFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ChannelInstance, ChannelAttributes> => {
    const attributes: SequelizeAttributes<ChannelAttributes> = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    };
    const ChannelModel = sequelize.define<ChannelInstance, ChannelAttributes>('Channel', attributes);

    ChannelModel.associate = models => {
        ChannelModel.belongsTo(models.Namespace, { as: 'namespace', foreignKey: 'namespaceId' });
        ChannelModel.hasMany(models.Message, { foreignKey: 'toChannelId' });
    };

    return ChannelModel;
}