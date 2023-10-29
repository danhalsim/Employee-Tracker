const inquirer = require("inquirer");
const { db } = require("./config/connection");

// start menu
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

// menu option functions
function menuOptions(answers) {
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
            console.log("Closed the program.");
            process.exit(0);
    }
};

// show all departments
function viewDepartments() {
    const sql = "SELECT * FROM departments"

    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        init();
    });
};

// show all roles
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

// show all employees
function viewEmployees() {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, roles.salary, department_name,
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

// add a department
function addDepartment() {
    inquirer.prompt([
            {
                type: "input",
                message: "Department name:",
                name: "department_name",
            },
        ])
        .then(answer => {
            const sql = "INSERT INTO departments SET ? "
            db.query(sql, answer, (err, result) => {
                if (err) throw err
                console.log(`"${answer.department_name}" has been added as a department.`)
                viewDepartments();
            });
        });
};

// add a role
function addRole() {
    inquirer.prompt([
            {
                type: "input",
                message: "Title:",
                name: "title",
            },
            {
                type: "input",
                message: "Salary:",
                name: "salary",
            },
            {
                type: "input",
                message: "Enter a department ID for this role:",
                name: "department_id",
            },
        ])
        .then(answer => {
            const sql = "INSERT INTO roles SET ? ";
            const role = {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            };
            db.query(sql, role, (err, res) => {
                if (err) throw err
                console.log(`"${answer.title}" has been added as a role.`)
                viewRoles();
            });
        });
};

// add an employee
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
        const sql = "INSERT INTO employees SET ? ";
        const employee = {
            first_name: answer.first_name,
            last_name: answer.last_name,
            roles_id: answer.roles_id,
            manager_id: answer.manager_id
        };
        db.query(sql, employee, (err, res) => {
            if (err) throw err
            console.log(`"${answer.first_name} ${answer.last_name}" has been added as an employee.`);
            viewEmployees();
        });
    })
};

// update an employee's role
function updateEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Employee ID:",
            name: "employee_id"
        },
        {
            type: "input",
            message: "New role ID:",
            name: "new_role_id"
        }
    ])
    .then(answer => {
        const update = [answer.new_role_id, answer.employee_id];
        const query = `UPDATE employees
        SET roles_id = ?
        where id = ?`;
        db.query(query, update, (err, res) => {
            if (err) throw err
            console.log(`Employee with ID (${answer.employee_id}) has been updated with a new role ID of (${answer.new_role_id}).`)
            viewEmployees();
        })
    })
};

// start the app
const init = () => {
    inquirer.prompt(startMenu)
    .then(function (answers) {
        menuOptions(answers)
    })
};

init();