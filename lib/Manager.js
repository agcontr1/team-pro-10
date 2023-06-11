let Employee = require('./Employee');

class Manager extends Employee {
    constructor(id, name, email, officeNum) {
        super(id, name, email);
        this.officeNumber = officeNum;
    }

    getOfficeNumber() { return this.officeNumber; }
    getRole() { return 'Manager'; } // Employee parent class override
}

module.exports = Manager;