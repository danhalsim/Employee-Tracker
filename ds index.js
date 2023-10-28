const inquirer = require("inquirer");
const { db } = require("./config/connection");

const startMenu = [{
    type: "list",
    message: "Menu:",
    name: "menu",
    choices: ["View all departments",
              "View all roles",
              "View all employees",
              "Add a department",
              "Add a role",
              "Add an employee",
              "Update an employee's role",
              "Close program",
    ],
}];

function menuOptions(answers) {
// const menuOptions = (answers) => {
    switch (answers.menu) {
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
        case "Close program":
            console.log("Closed the program");
            process.exit(0);
        // default:
        //     console.log("Outside switch statment options!");
        //     process.exit(0);
    }
};

// show all departments function
function viewDepartments() {
    const sql = "SELECT * FROM departments"

    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        init();
    });
};

// show all roles function
function viewRoles() {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.department_name 
    FROM roles 
    JOIN departments
    ON departments.id = roles.department_id`
    
    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        init();
    });
};

// show all employees function
function viewEmployees() {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, roles.salary, department_name,
    CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employees
    JOIN roles
    ON roles.id = employees.roles_id
    JOIN departments
    ON departments.id = roles.department_id
    LEFT JOIN employees AS manager
    ON employees.manager_id = manager.id`

    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        init();
    });
};

// function to add a department
function addDepartment() {
    inquirer.prompt([
            {
                type: "input",
                name: "department_name",
                message: "What department do you want to add?",
            },
        ])
        .then(answer => {
            const sql = "INSERT INTO departments SET ? "
            db.query(sql, answer, (err, result) => {
                if (err) throw err
                console.log(`${answer.department_name} department has been added.`)
                init();
            });
        });
};

// function to add a role
function addRole() {
    inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Role title:",
            },
            {
                type: "input",
                name: "salary",
                message: "Salary:",
            },
            {
                type: "input",
                name: "department_id",
                message: "Enter a department ID for this role:",
            },
        ])
        .then(answer => {
            const newRole = {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            };
            db.query("INSERT INTO roles SET ? ", newRole, (err, res) => {
                err ? console.error(err) : console.log(`${answer.title} role has been added.`);
                init();
            });
        });
};

const addEmployee = () => {
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
                    type: "input",
                    message: "Provide a first name for the new employee:",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "Provide a last name for the new employee:",
                    name: "last_name"
                },
                {
                    type: "list",
                    message: "Select a role for the new employee:",
                    choices: roles,
                    name: "title"
                },
                {
                    type: "list",
                    message: "Select a manager for the new employee:",
                    choices: employees,
                    name: "manager"
                }
            ])
            .then((answer => {
                const roleQuery = `SELECT id
                                   FROM roles
                                   WHERE title = ?`;
                db.query(roleQuery, answer.title, (err, res) => {
                    if (err) {
                        console.error(err);
                    };
                    [{ id }] = res;
                    const roles_id = id;
                    const employeeQuery = `SELECT id
                                           FROM employees
                                           WHERE first_name = ?`;
                    db.query(employeeQuery, answer.manager, (err, res) => {
                        if (err) {
                            console.error(err);
                        };
                        [{ id }] = res;
                        const manager_id = id;
                        const newEmployees = {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            roles_id: roles_id,
                            manager_id: manager_id
                        };
                        db.query("INSERT INTO employees SET ? ", newEmployees, (err, res) => {
                            err ? console.error(err) : console.log(`${answer.first_name} employee has been added.`)
                            init();
                        });
                    });
                });
            }));
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
    inquirer
    .prompt(startMenu)
    .then(function (answers) {
        menuOptions(answers)
    })
};
  
init();