import * as path from 'path';

import * as express from 'express';

import * as http from 'http';
import * as socketIO from 'socket.io'

const publicPath = path.join(__dirname, './public');

class App{
    public app: express.Application;
    public server: http.Server;
    public io: socketIO.Server;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIO(this.server);

        this.app.use(express.static(publicPath));

        this.io.on('connection', (socket) => {
            console.log('Hello world');
        });
    }
}

export default new App().server;