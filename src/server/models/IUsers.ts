'use strict'
import User from './User';

export default interface IUsers {
    getUserById(userId: string): User;
    getUserByName(userId: string): User;
    getAllUsers(room: string): Array<User>;
    addUser(user: User): User;
    removeUser(userId: string): User;
}