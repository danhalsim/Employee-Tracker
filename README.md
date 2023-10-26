# Employee-Tracker

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

This application is the back end for an e-commerce site that allows the user to manage categories, products, and tags.

The application uses the following relationship model:

- Product belongs to Category, as a category can have multiple products but a product can only belong to one category.
- Category has many Product models.
- Product belongs to many Tag models. Using the ProductTag through model, allow products to have multiple tags and tags to have many products.
- Tag belongs to many Product models.

This application uses the Express.js API and uses Sequelize to interact with a MySQL database.

The user uses Insomnia to interact with the application.

Watch a demo of this application here: https://www.youtube.com/watch?v=hOc3fZqYjQ0

A screenshot of the application running in Insomnia:

![screenshot](./Assets/screenshot-insomnia.png)


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
- Insomnia

Dependencies used:
- dotenv
- express
- mysql
- sequelize

Clone this repository. Install any programs you may need. Run `npm i` to install the dependencies.


## Usage

Once your programs and dependencies are installed, follow these instructions:
1. Create a `.env` file in the main folder of the application.
2. Enter the following items:
    - DB_NAME=ecommerce_db
    - DB_USER=root
    - DB_PASSWORD=`your password`
3. Open the terminal in the db folder.
4. Run `mysql -u root` (`mysql -u root -p` if you have a password).
5. Run `SOURCE schema.sql;`.
6. Run `USE ecommerce_db`.
7. Open a new terminal in the main folder.
8. Run `npm run seed`.
9. Run `npm start`.
10. Open Insomnia. Import this [environment file](./Assets/E-commerce%20Back%20End%20-%20Insomnia).
11. Send your requests. Change any information in the JSON request body as you like.


## Credits

- dotenv
    - https://www.npmjs.com/package/dotenv
- express
    - https://www.npmjs.com/package/express
- mysql
    - https://www.npmjs.com/package/mysql
- sequelize
    - https://www.npmjs.com/package/sequelize
- MDN Web Docs
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
- UCI BCS for the application description.
- AskBCS for help with debugging.


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