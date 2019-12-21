const Roles = Object.freeze({"teacher": 1, "student": 2});

class User {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }
}