export class Room {
    constructor(teacher) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.teacher = teacher;
        this.users = [];
    }
}