// Include packages needed for this application
let Manager = require('./lib/Manager');
let Engineer = require('./lib/Engineer');
let Intern = require('./lib/Intern');
let render = require('./src/render');

const inquirer = require('inquirer');
const fs = require('fs');

// Declaring information to be generated
const employeeList = [];
let siteName;

// Create a set of questions
let managerInquiry = [
    { name: 'name', type: 'input', message: 'Input Team Manager Name:' },
    { name: 'id', type: 'input', message: 'Input Team Manager ID:' },
    { name: 'email', type: 'input', message: 'Input Team Manager Email:' },
    { name: 'officeNum', type: 'input', message: 'Input Team Manager Office Number:' },
];
let engineerInquiry = [
    { name: 'name', type: 'input', message: 'Input Engineer Name:' },
    { name: 'id', type: 'input', message: 'Input Engineer ID:' },
    { name: 'email', type: 'input', message: 'Input Engineer Email:' },
    { name: 'github', type: 'input', message: 'Input Engineer Github:' },
];
let internInquiry = [
    { name: 'name', type: 'input', message: 'Input Intern Name:' },
    { name: 'id', type: 'input', message: 'Input Intern ID:' },
    { name: 'email', type: 'input', message: 'Input Intern Email:' },
    { name: 'school', type: 'input', message: 'Input Intern School:' },
];
let roleInquiry = {
    name: 'role', type: 'list',
    message: 'Select the role for the new Employee:',
    choices: ['intern', 'engineer']
}

// Create a function to write HTML file
function writeToFile(fileName, data) {
    //let output = render(template, data);
    //fs.writeFileSync(`./${fileName}.md`, output);
}

// Create a function to initialize app
async function init() {
    const getSite = await inquirer.prompt({ name: 'siteName', type: 'input', message: 'Input the page title:' });
    siteName = getSite.siteName;

    const getManager = await inquirer.prompt(managerInquiry);
    employeeList.push(new Manager(getManager.id, getManager.name, getManager.email, getManager.officeNum));

    let addNew = true;
    while (addNew) {
        let getRole = await inquirer.prompt(roleInquiry);

        if (getRole.role === 'engineer') {
            let getEngineer = await inquirer.prompt(engineerInquiry);
            employeeList.push(new Engineer(getEngineer.id, getEngineer.name, getEngineer.email, getEngineer.github));
        } else {
            let getIntern = await inquirer.prompt(internInquiry);
            employeeList.push(new Intern(getIntern.id, getIntern.name, getIntern.email, getIntern.school));
        }

        let getNext = await inquirer.prompt({ name: 'addNew', type: 'confirm', message: 'Add another Employee?'});
        addNew = getNext.addNew;
    }

    fs.writeFileSync('./out.html', render(siteName, employeeList));
}

// Function call to initialize app
init();
