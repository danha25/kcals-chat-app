'use strict'
import User from 'kcals-common/lib/User';

export default interface IUsers {
    createUser(username: string, password: string, name: string, email: string): User;
    getUser(username: string): User;
    getUserById(id: string): User;
}