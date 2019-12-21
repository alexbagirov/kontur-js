import {User, Roles} from './base';

class Student extends User {
    constructor(name) {
        super(name, Roles.student);
        this.points = 0;
        this.hasQuestion = false;
        this.hasAnswer = false;
    }
}