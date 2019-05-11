import * as path from 'path';
import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs-extra';
import * as jsyaml from 'js-yaml';
import SocketIO from './socketio';
import DAO from './db';
import {seedData} from './db/Seed'

const publicPath = path.join(__dirname, '../public');

class App {
    public app: express.Application;
    public server: http.Server;

    private dao: DAO;
    public io: SocketIO;

    constructor() {
        this.app = express();
        this.app.use(express.static(publicPath));

        this.server = http.createServer(this.app);

        // database connection
        const sequelizeConfig = fs.readFileSync('./config/sequelize-sqlite.yaml', 'utf8');
        const params = jsyaml.safeLoad(sequelizeConfig);
        this.dao = new DAO(params);

        if (process.env.NODE_ENV == 'dev') {
            seedData(this.dao);
        }

        this.io = new SocketIO(this.server, this.dao);
    }
}

export default new App().server;