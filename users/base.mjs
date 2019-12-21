export const Roles = Object.freeze({"teacher": 1, "student": 2});

export class User {
    constructor(name, role) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.role = role;
    }
}
