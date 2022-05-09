const express = require("express");
const mysql = require("mysql2");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3001;
const inquirer = require("inquirer");
const { kill } = require("nodemon/lib/monitor/run");
const questions = [
  {
    type: "list",
    name: "whatFirst",
    message: "What would you like to do?",
    // TODO -- Add more options for adding things later.
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Delete a Department",
      "Add a Role",
      "Delete a Role",
      "Exit Application",
    ],
  },
  {
    type: "input",
    name: "addDepartment",
    message: "Enter the name of the department.",
    when(answers) {
      return answers.whatFirst === "Add a Department";
    },
  },
  {
    type: "input",
    name: "deleteDepartment",
    message: "Enter the name of the department you would you like to delete.",
    when(answers) {
      return answers.whatFirst === "Delete a Department";
    },
  },
  {
    type: "input",
    name: "roleTitle",
    message: "Enter the name of the role.",
    when(answers) {
      return answers.whatFirst === "Add a Role";
    },
  },
  {
    type: "input",
    name: "roleSalary",
    message: "Enter the salary for this role.",
    when(answers) {
      return answers.whatFirst === "Add a Role";
    },
  },
  {
    type: "input",
    name: "roleDepartment",
    message: "Which department does this role belong to?",
    when(answers) {
      return answers.whatFirst === "Add a Role";
    },
  },
  {
    type: "input",
    name: "deleteRole",
    message: "Enter the name of the role you would you like to delete.",
    when(answers) {
      return answers.whatFirst === "Delete a Role";
    },
  },
];

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SQL Connection
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  console.log("Connected to the team_db database.")
);

// CLI APP:

function businessManager() {
  inquirer.prompt(questions).then((answers) => {
    if (answers.whatFirst === "View All Departments") {
      //query to see all departments
      db.query(`SELECT * FROM departments`, function (err, results) {
        console.log("");
        console.table(results);
      });

      businessManager();
    } else if (answers.whatFirst === "View All Roles") {
      // query to see all roles
      db.query(
        `SELECT roles.id, roles.title, roles.salary, departments.department_name FROM roles JOIN departments ON departments.id = roles.department_id`,
        function (err, results) {
          console.log("");
          console.table(results);
        }
      );

      businessManager();
    } else if (answers.whatFirst === "View All Employees") {
      //query to see all employees -- TODO -- import data from other tables via a JOIN
      db.query(`SELECT * FROM employees`, function (err, results) {
        console.log("");
        console.table(results);
      });
      businessManager();
    } else if (answers.whatFirst === "Add a Department") {
      db.query(
        `INSERT INTO departments (department_name) VALUES ('${answers.addDepartment}')`,
        function (err, results) {
          console.log("");
          console.log("Adding New Department");
        }
      );
      db.query("SELECT * FROM departments", function (err, results) {
        console.log("");
        console.table(results);
      });
      businessManager();
    } else if (answers.whatFirst === "Delete a Department") {
      db.query(
        `DELETE FROM departments WHERE department_name = ('${answers.deleteDepartment}')`,
        function (err, results) {
          console.log("");
          console.log(
            `Department: ${answers.deleteDepartment} has been deleted.`
          );
        }
      );
      db.query("SELECT * FROM departments", function (err, results) {
        console.log("");
        console.table(results);
      });
      businessManager();
    } else if (answers.whatFirst === "Add a Role") {
      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.roleTitle}', ${answers.roleSalary}, ${answers.roleDepartment})`,
        function (err, results) {
          console.log("");
          console.log("Adding New Department");
        }
      );
      db.query(
        "SELECT roles.id, roles.title, roles.salary, departments.department_name FROM roles JOIN departments ON departments.id = roles.department_id",
        function (err, results) {
          console.log("");
          console.table(results);
        }
      );

      businessManager();
    } else if (answers.whatFirst === "Delete a Role") {
      db.query(
        `DELETE FROM roles WHERE title = ('${answers.deleteRole}')`,
        function (err, results) {
          console.log("");
          console.log(
            `Department: ${answers.deleteRole} has been deleted.`
          );
        }
      );
      db.query("SELECT * FROM roles", function (err, results) {
        console.log("");
        console.table(results);
      });
      businessManager();
    } else if (answers.whatFirst === "Add an Employee") {
      //something
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.addEmployeeFname}', '${answers.addEmployeeLname}', ${answers.addEmployeeRole}, ${answers.addEmployeeManager})`,
        function (err, results) {
          console.log("");
          console.log("Adding New Department");
        }
      );
      db.query(
        "SELECT employee.Id, employee.first_name, employee.last_name, roles.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON roles.id = employee.role_id",
        function (err, results) {
          console.log("");
          console.table(results);
        }
      );

      businessManager();
    } else if (answers.whatFirst === "Update an Employee Role") {
      //something
      db.query(
        `UPDATE employee SET role_id = '${answers.updateEmployeeRole}' WHERE id = '${answers.updateEmployee}'`,
        function (err, results) {
          console.log("");
          console.log(
            `Employee ID: ${answers.updateEmployee} has been updated to Role ID: ${answers.updateEmployeeRole}`
          );
        }
      );
      db.query(
        "SELECT employee.Id, employee.first_name, employee.last_name, roles.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON roles.id = employee.role_id",
        function (err, results) {
          console.log("");
          console.table(results);
        }
      );

      businessManager();
    } else if (answers.whatFirst === "Update an Employee Manager") {
      //something
      db.query(
        `UPDATE employee SET manager_id = '${answers.updateEmployeeManager}' WHERE id = '${answers.updateManagerofEmployeeID}'`,
        function (err, results) {
          console.log("");
          console.log(
            `Employee ID: ${answers.updateManagerofEmployeeID} has been updated to Role ID: ${answers.updateEmployeeManager}`
          );
        }
      );
      db.query(
        "SELECT employee.Id, employee.first_name, employee.last_name, roles.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON roles.id = employee.role_id",
        function (err, results) {
          console.log("");
          console.table(results);
        }
      );

      businessManager();
    } else {
      // Kills application
      console.log("Goodbye!");
      process.exit(1);
    }
  });
}

// Starts application and provides a way to quit as well.
function runApp() {
  inquirer.prompt(questions).then((answers) => {
    if (answers.whatFirst === "Exit Application") {
      console.log("Goodbye!");
      process.exit(1);
    } else {
      businessManager();
    }
  });
}

// Starts the application
runApp();
