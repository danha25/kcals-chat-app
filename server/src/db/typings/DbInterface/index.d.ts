import * as Sequelize from 'sequelize';
import { NamespaceAttributes, NamespaceInstance } from '../../models/Namespace';
import { ChannelAttributes, ChannelInstance } from '../../models/Channel';
import { UserAttributes, UserInstance } from '../../models/User';
import { MessageAttributes, MessageInstance } from '../../models/Message';

export interface DbInterface{
    sequelize: Sequelize.Sequelize;
    Sequelize: Sequelize.SequelizeStatic;
    Namespace: Sequelize.Model<NamespaceInstance,NamespaceAttributes>;
    Channel: Sequelize.Model<ChannelInstance, ChannelAttributes>;
    User: Sequelize.Model<UserInstance, UserAttributes>;
    Message: Sequelize.Model<MessageInstance, MessageAttributes>;
}