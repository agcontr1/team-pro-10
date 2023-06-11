let Employee = require('./Employee');

class Intern extends Employee {
    constructor(id, name, email, school) {
        super(id, name, email);
        this.school = school;
    }

    getSchool() { return this.school; }
    getRole() { return 'Intern'; } // Employee parent class override
}

module.exports = Intern;