const inquirer = require("inquirer");
const { kill } = require("nodemon/lib/monitor/run");
const db = require("./server");
const firstQuestion = [
  {
    type: "list",
    name: "whatFirst",
    message: "What would you like to do?",
    // TODO -- Add more options for adding things later.
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Exit Application",
    ],
  },
];

// Starts application and provides a way to quit as well.
function startApp() {
  inquirer.prompt(firstQuestion).then((answers) => {
    if (answers.whatFirst === "Exit Application") {
      console.log("Goodbye!");
      return;
    } else if (
      answers.whatFirst === "View All Departments" ||
      "View All Roles" ||
      "View All Employees"
    ) {
      console.log(`${answers.whatFirst}`);
      let response = `${answers.whatFirst}`;
      viewBusiness(response);
    }
  });
}

// Function for viewing select business data.
function viewBusiness() {
  if ("View All Roles") {
    db.query("SELECT * FROM roles", function (err, results) {
      console.log("Roles");
      console.log(results);
    });
  }
  if ("View All Departments") {
    db.query("SELECT * FROM departments", function (err, results) {
      console.log("Departments");
      console.log(results);
    });
  }
  // if ("View All Employees") {
  //   db.query("SELECT * FROM employees"),
  //     function (err, results) {
  //       console.log(results);
  //     };
  // }
  else {
    console.log("Error...figure it out");
  }
}

// Starts the application
startApp();
