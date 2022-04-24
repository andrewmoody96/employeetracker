const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const PORT = process.env.PORT || 3001;
const app = express();
const req = require("express/lib/request");
const res = require("express/lib/response");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "A$pdmjlm1",
    database: "team_db",
  },
  console.log("Connected to the employees_db database.")
);

const questions = [
  {
    type: "list",
    name: "whatFirst",
    message: "What would you like to do?",
    // TODO -- Add more options for adding things later.
    choices: ["View All Departments", "View All Roles", "View All Employees"],
  },
];

function businessManagement() {
  inquirer.prompt(questions).then((answers) => {
    if (answers.whatFirst === 'View All Departments') {
      db.query('SELECT * FROM departments', function (err, results) {
        console.log(results);
      })
    }
  })
}