import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';
import { NamespaceInstance, NamespaceAttributes } from './Namespace';
import { MessageInstance, MessageAttributes} from './Message';
import User from 'kcals-common/lib/User';

export interface UserAttributes extends User {
    createdAt?: Date;
    updatedAt?: Date;

    namespace?: NamespaceAttributes | NamespaceAttributes['id'];
    messages?: Array<MessageAttributes> | Array<MessageAttributes['id']>;
};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
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

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
    const attributes: SequelizeAttributes<UserAttributes> = {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    };
    const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

    User.associate = models => {
        User.belongsTo(models.Namespace, { as: 'namespace', foreignKey: 'namespaceId' });
        User.hasMany(models.Message, { foreignKey: 'userId' });
        User.hasMany(models.Message, { foreignKey: 'toUserId' });
    };

    return User;
}