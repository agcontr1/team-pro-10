const fs = require('fs');

function render(siteName, employeeList) {
    const cardTemplate = fs.readFileSync('./src/card.html', 'utf8');
    let template = fs.readFileSync('./src/template.html', 'utf8');
    template = template.replace(/{{siteName}}/g, siteName);

    let empHtml = ''
    employeeList.forEach((emp) => {
        let empCard = cardTemplate.slice();

        empCard = empCard.replace(/{{name}}/g, emp.getName());
        empCard = empCard.replace(/{{role}}/g, emp.getRole());
        empCard = empCard.replace(/{{id}}/g, emp.getId());
        empCard = empCard.replace(/{{email}}/g, emp.getEmail());

        switch (emp.getRole()) {
            case 'Manager':
                empCard = empCard.replace(/{{roleSpecific}}/g, `<p class="card-text">Office: ${emp.getOfficeNumber()}</p>`);
                break;
            case 'Engineer':
                empCard = empCard.replace(/{{roleSpecific}}/g, `<a href="${emp.getGithub()}" target="_blank" rel="noopener noreferrer">${emp.getGithub()}</a>`);
                break;
            case 'Intern':
                empCard = empCard.replace(/{{roleSpecific}}/g, `<p class="card-text">School: ${emp.getSchool()}</p>`);
                break;
            default:
                empCard = empCard.replace(/{{roleSpecific}}/g, '');
                break;
        }

        empHtml = empHtml.concat(empCard);
    });

    template = template.replace(/{{employeeList}}/g, empHtml);

    return template;
}

module.exports = render;