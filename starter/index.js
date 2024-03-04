const Manager = require('./lib/Manager');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

const questions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email?"
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Manager", "Engineer", "Intern"]
    }
];

function init() {
    inquirer.prompt(questions).then((answers) => {
        if (answers.role === "Manager") {
            inquirer.prompt({
                type: "input",
                name: "officeNumber",
                message: "What is the manager's office number?"
            }).then((managerAnswer) => {
                const manager = new Manager(answers.name, answers.id, answers.email, managerAnswer.officeNumber);
                teamMembers.push(manager);
                addEmployee();
            });
        } else if (answers.role === "Engineer") {
            inquirer.prompt({
                type: "input",
                name: "github",
                message: "What is the engineer's GitHub username?"
            }).then((engineerAnswer) => {
                const engineer = new Engineer(answers.name, answers.id, answers.email, engineerAnswer.github);
                teamMembers.push(engineer);
                addEmployee();
            });
        } else if (answers.role === "Intern") {
            inquirer.prompt({
                type: "input",
                name: "school",
                message: "What is the intern's school?"
            }).then((internAnswer) => {
                const intern = new Intern(answers.name, answers.id, answers.email, internAnswer.school);
                teamMembers.push(intern);
                addEmployee();
            });
        }
    });
}

function addEmployee() {
    inquirer.prompt({
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add another employee?"
    }).then((answers) => {
        if (answers.addEmployee) {
            init();
        } else {
            const html = render(teamMembers);
            fs.writeFileSync(outputPath, html);
            console.log("Team HTML file has been generated successfully!");
        
        }
    });
}

init();

module.exports = {
    teamMembers,
    questions,
    init,
    addEmployee
  };
