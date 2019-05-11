import * as Sequelize from 'sequelize';
import { DbInterface } from './typings/DbInterface';
import { NamespaceFactory } from './models/Namespace';
import { ChannelFactory } from './models/Channel';
import { UserFactory } from './models/User';
import { MessageFactory } from './models/Message';

export const createModels = (sequelizeConfig: any): DbInterface => {
    const { database, username, password, params } = sequelizeConfig;
    const sequelize = new Sequelize(database, username, password, params);

    const db: DbInterface = {
        sequelize: sequelize,
        Sequelize: Sequelize,
        Namespace: NamespaceFactory(sequelize, Sequelize),
        Channel: ChannelFactory(sequelize, Sequelize),
        User: UserFactory(sequelize, Sequelize),
        Message: MessageFactory(sequelize, Sequelize)
    }

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    return db;
}