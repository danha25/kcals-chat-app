'use strict'

export default interface User {
    id?: number;
    username: string;
    password: string;
    name: string;
    email: string;
    avatarUrl: string;
    online?: boolean;
}