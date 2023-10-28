const inquirer = require("inquirer");
const { db } = require("./config/connection");

const startPrompt = [{
    type: "list",
    message: "Please select an option to get started:",
    choices: ["View all departments",
              "View all roles",
              "View all employees",
              "Add a department",
              "Add a role",
              "Add an employee",
              "Update an employee's role",
              "Exit",
    ],
    name: "selection"
}];

const selectionOptions = (answers) => {
    switch (answers.selection) {
        case "View all departments":
            viewDepartments();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "View all employees":
            viewEmployees();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update an employee's role":
            updateEmployee();
            break;
        case "Exit":
            console.log("Exiting program!");
            process.exit(0);
        default:
            console.log("Outside switch statment options!");
            process.exit(0);
    }
};

function viewDepartments() {
// const viewDepartments = () => {
    db.query("SELECT * FROM departments", (err, res) => {
        err ? console.error(err) : console.table(res);
        init();
    });
};

const viewRoles = () => {
    const query = `SELECT roles.id, roles.title, roles.salary, departments.department_name 
                   FROM roles 
                   JOIN departments
                   ON departments.id = roles.department_id`;
    db.query(query, (err, res) => {
      err ? console.error(err) : console.table(res);
      init();
    });
};

const viewEmployees = () => {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, roles.salary, department_name,
                   CONCAT(manager.first_name, " ", manager.last_name) AS manager
                   FROM employees
                   JOIN roles
                   ON roles.id = employees.roles_id
                   JOIN departments
                   ON departments.id = roles.department_id
                   LEFT JOIN employees AS manager
                   ON employees.manager_id = manager.id`;
    db.query(query, (err, res) => {
        err ? console.error(err) : console.table(res);
        init();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "text",
            message: "Provide a name for the new department:",
            name: "department_name"
        }
    ])
    .then((answer => {
        db.query("INSERT INTO departments SET ? ", answer, (err, res) => {
            err ? console.error(err) : console.log(`${answer.department_name} department has been added.`);
            init();
        });
    }));
};

const addRole = () => {
    db.query("SELECT * FROM departments", (err, res) => {
        if (err) {
            console.error(err);
        };
        const departments = res.map(resInfo => resInfo.department_name);
        inquirer.prompt([
            {
                type: "input",
                message: "Provide a name for the new role:",
                name: "title"
            },
            {
                type: "input",
                message: "Provide a salary for the new role:",
                name: "salary"
            },
            {
                type: "list",
                message: "Select a department for the new role:",
                choices: departments,
                name: "department_name"
            }
        ])
        .then((answer => {
            const query = `SELECT id
                           FROM departments
                           WHERE department_name = ?`;
            db.query(query, answer.department_name, (err, res) => {
                if (err) {
                    console.error(err);
                };
                [{ id }] = res;
                const newRole = {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: id
                };
                db.query("INSERT INTO roles SET ? ", newRole, (err, res) => {
                    err ? console.error(err) : console.log(`${answer.title} role has been added.`);
                    init();
                });
            });
        }));
    });
};

function addEmployee() {
    inquirer.prompt([
                {
                    type: "input",
                    message: "First name:",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "Last name:",
                    name: "last_name"
                },
                {
                    type: "input",
                    message: "Enter a role ID:",
                    name: "roles_id"
                },
                {
                    type: "input",
                    message: "Enter a manager ID:",
                    name: "manager_id"
                }
            ])
            .then(answer => {
                const newEmployee = {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            roles_id: answer.roles_id,
                            manager_id: answer.manager_id
                        };
                        db.query("INSERT INTO employees SET ? ", newEmployee, (err, res) => {
                            if (err) throw err
                            console.log(`${answer.first_name} ${answer.last_name} has been added as an employee.`)
                            init();
                        });
                    });
                };

const updateEmployee = () => {
    db.query("SELECT * FROM employees", (err, res) => {
        if (err) {
            console.error(err);
        };
        const employees = res.map(resInfo => resInfo.first_name);
        db.query("SELECT * FROM roles", (err, res) => {
            if (err) {
                console.error(err);
            };
            const roles = res.map(resInfo => resInfo.title);
            inquirer.prompt([
                {
                    type: "list",
                    message: "Select an employee you wish to update:",
                    choices: employees,
                    name: "first_name"
                },
                {
                    type: "list",
                    message: "Select a new role for the employee:",
                    choices: roles,
                    name: "role"
                }
            ])
            .then((answer => {
                const query = `UPDATE employees
                               SET roles_id = (SELECT id FROM roles WHERE title = ?)
                               WHERE first_name = ?`;
                db.query(query, [answer.role, answer.first_name], (err, res) => {
                err ? console.error(err) : console.log(`${answer.first_name} has been updated`);
                viewEmployees();
                })
            }));
        });
    });    
}

const init = () => {
    inquirer.prompt(startPrompt).then(function (answers) {
        selectionOptions(answers)
    })
}
  
init();