import {User, Roles} from './base';

class Teacher extends User {
    constructor(name) {
        super(name, Roles.teacher);
    }
}