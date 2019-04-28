import * as path from 'path';
import * as express from 'express';
import * as http from 'http';
import SocketIO from './server/socketio';

const publicPath = path.join(__dirname, 'public');

class App{
    public app: express.Application;
    public server: http.Server;
    public io: SocketIO;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new SocketIO(this.server);

        // static resources
        this.app.use(express.static(publicPath));
        this.app.use('/libs', express.static(__dirname + '/../node_modules/jquery/dist/'));
        this.app.use('/libs', express.static(__dirname + '/../node_modules/mustache/'));
    }
}

export default new App().server;