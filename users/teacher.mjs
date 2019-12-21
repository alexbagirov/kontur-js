import {User, Roles} from './base';

export class Teacher extends User {
    constructor(name) {
        super(name, Roles.teacher);
    }
}