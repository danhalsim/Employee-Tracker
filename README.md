# Employee Tracker

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

This is a command-line application for managing a company's employee database.

The application has the following functions:

- View departments
- View roles
- View employees
- Add a department
- Add a role
- Add an employee
- Update an employee's role

Watch a demo of the application here: https://www.youtube.com/watch?v=rKwUuS-pmno

A screenshot of the application running:

![screenshot](./Assets/screenshot.png)


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributions](#contributions)
- [Tests](#Tests)
- [Questions](#Questions)


## Installation

Programs used:
- VS Code and/or Git Bash

Dependencies used:
- dotenv
- inquirer
- mysql2

Clone this repository. Install any programs you may need. Run `npm i` to install the dependencies.


## Usage

Once your programs and dependencies are installed, follow these instructions:
1. Create a `.env` file in the `main` folder of the application.
2. Enter the following items:
    - DB_NAME=database_db
    - DB_USER=root
    - DB_PASSWORD=`your password`
3. Open the terminal in the `db` folder.
4. Run `mysql -u root` (`mysql -u root -p` if you have a password).
5. Run `SOURCE schema.sql;`.
6. Run `SOURCE seeds.sql;`.
7. Open a new terminal in the `main` folder.
8. Run `node index`.
9. Start using the application.



## Credits

- dotenv
    - https://www.npmjs.com/package/dotenv
- inquirer
    - https://www.npmjs.com/package/inquirer
- mysql2
    - https://www.npmjs.com/package/mysql2
- MDN Web Docs: throw
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
- UCI BCS for the application description.
- AskBCS for help with debugging.
- Xpert Learning Assistant for help with:
    - Creating a switch statement (index.js lines 21-48)
    - Viewing data in mysql (index.js lines 77-85)
    - Updating data in mysql (index.js lines 203-205)


## License

This project uses the MIT License.

https://opensource.org/licenses/MIT 


## Contributions

N/A


## Tests

N/A


## Questions

If you have any questions about the project, please reach out!

Github: https://github.com/danhalsim

Email: dansim6935@gmail.com