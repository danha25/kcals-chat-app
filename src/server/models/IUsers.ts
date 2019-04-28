'use strict'
import User from './User';

export default interface IUsers{
    getUser(userId: string): User; 
    getAllUsers(room: string): Array<User>;
    addUser(user: User): User;
    removeUser(userId: string): User; 
}