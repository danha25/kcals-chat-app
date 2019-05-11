import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';
import Namespace from 'kcals-common/lib/Namespace';
import { ChannelInstance, ChannelAttributes } from './Channel';
import { UserInstance, UserAttributes } from './User';

export interface NamespaceAttributes extends Namespace {
    createdAt?: Date;
    updatedAt?: Date;

    channels?: Array<ChannelAttributes> | Array<ChannelAttributes['id']>;
    users?: Array<UserAttributes> | Array<UserAttributes['id']>;
};

export interface NamespaceInstance extends Sequelize.Instance<NamespaceAttributes>, NamespaceAttributes {
    // Channels
    getChannels: Sequelize.HasManyGetAssociationsMixin<ChannelInstance>;
    setChannels: Sequelize.HasManySetAssociationsMixin<ChannelInstance, ChannelInstance['id']>;
    addChannels: Sequelize.HasManyAddAssociationsMixin<ChannelInstance, ChannelInstance['id']>;
    addChannel: Sequelize.HasManyAddAssociationMixin<ChannelInstance, ChannelInstance['id']>;
    createChannel: Sequelize.HasManyCreateAssociationMixin<ChannelAttributes, ChannelInstance>;
    removeChannel: Sequelize.HasManyRemoveAssociationMixin<ChannelInstance, ChannelInstance['id']>;
    removeChannels: Sequelize.HasManyRemoveAssociationsMixin<ChannelInstance, ChannelInstance['id']>;
    hasChannel: Sequelize.HasManyHasAssociationMixin<ChannelInstance, ChannelInstance['id']>;
    hasChannels: Sequelize.HasManyHasAssociationsMixin<ChannelInstance, ChannelInstance['id']>;
    countChannels: Sequelize.HasManyCountAssociationsMixin;

    // Users
    getUsers: Sequelize.HasManyGetAssociationsMixin<UserInstance>;
    setUsers: Sequelize.HasManySetAssociationsMixin<UserInstance, UserInstance['id']>;
    addUsers: Sequelize.HasManyAddAssociationsMixin<UserInstance, UserInstance['id']>;
    addUser: Sequelize.HasManyAddAssociationMixin<UserInstance, UserInstance['id']>;
    createUser: Sequelize.HasManyCreateAssociationMixin<UserAttributes, UserInstance>;
    removeUser: Sequelize.HasManyRemoveAssociationMixin<UserInstance, UserInstance['id']>;
    removeUsers: Sequelize.HasManyRemoveAssociationsMixin<UserInstance, UserInstance['id']>;
    hasUser: Sequelize.HasManyHasAssociationMixin<UserInstance, UserInstance['id']>;
    hasUsers: Sequelize.HasManyHasAssociationsMixin<UserInstance, UserInstance['id']>;
    countUsers: Sequelize.HasManyCountAssociationsMixin;
}

export const NamespaceFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<NamespaceInstance, NamespaceAttributes> => {
    const attributes: SequelizeAttributes<NamespaceAttributes> = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };
    const NamespaceModel = sequelize.define<NamespaceInstance, NamespaceAttributes>('Namespace', attributes);

    NamespaceModel.associate = models => {
        NamespaceModel.hasMany(models.Channel, { foreignKey: 'namespaceId' });
        NamespaceModel.hasMany(models.User, { foreignKey: 'namespaceId' });
    };

    return NamespaceModel;
}