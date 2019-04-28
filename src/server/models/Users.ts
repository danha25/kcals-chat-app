import User from './User';
import IUsers from './IUsers';

export default class Users implements IUsers {

    private users: Array<User>;

    constructor() {
        this.users = new Array();
    }

    public getUser(userId: string): User {
        return this.users.filter((user:User) => user.id === userId)[0];
    }
    public getAllUsers(room: string): Array<User> {
        return this.users.filter(u => u.room === room);
    }
    public addUser(user: User): User {
        this.users.push(user);
        return user;
    }
    public removeUser(userId: string): User {
        const user = this.getUser(userId);
        if(user) {
            this.users = this.users.filter((u: User) => u.id !== userId);
        }
        return user;
    }
}