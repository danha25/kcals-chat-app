import User from 'kcals-common/lib/User';
import IUsers from './IUsers';

export default class Users implements IUsers {

    private users: Array<User>;

    constructor() {
        this.users = new Array<User>();

        this.users.push({
            id: '1',
            username: 'username1',
            password: 'password1',
            name: 'First Last',
            email: 'name@email.com',
            photoUrl: 'http://localhost:3000/img/user1.png'
        });

        this.users.push({
            id: '2',
            username: 'username2',
            password: 'password2',
            name: 'name2',
            email: 'email2',
            photoUrl: 'http://localhost:3000/img/user2.png'
        });

        this.users.push({
            id: '3',
            username: 'username3',
            password: 'password3',
            name: 'name3',
            email: 'email3',
            photoUrl: 'http://localhost:3000/img/user1.png'
        });
    }

    public createUser(username: string, password: string, name: string, email: string, photoUrl: string): User {
        const user: User = {
            id: 'id' + username,
            username: username,
            password: password,
            name: name, 
            email: email,
            photoUrl: photoUrl
        };
        this.users.push(user);
        return user;
        
    }

    public getUser(username: string): User {
        return this.users.filter((user) => user.username === username)[0];
    }

    public getUserById(id: string): User {
        return this.users.filter((user) => user.id === id)[0];
    }

}