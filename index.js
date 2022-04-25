const inquirer = require("inquirer");
const { kill } = require("nodemon/lib/monitor/run");
const db = require("./server");
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
      "Exit Application",
    ],
  },
];

// Queries database and shows all departments.
function businessManager() {
  inquirer.prompt(questions).then((answers) => {
    if (answers.whatFirst === "View All Departments") {
      //query to see table of departments
      db.query("SELECT * FROM department", function (err, results) {
        console.log("");
        console.table(results);
      });
      //then
      businessManager();
    } else if (answers.whatFirst === "View All Roles") {
      //query to see table of roles
      db.query(
        "SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON department.id = role.department_id",
        function (err, results) {
          console.log("");
          console.table(results);
        }
      );
      //then
      businessManager();
    } else if (answers.whatFirst === "View All Employees") {
      //query to see table of employees
      db.query(
        "SELECT employee.Id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON role.id = employee.role_id",
        function (err, results) {
          console.log("");
          console.table(results);
        }
      );
      //then
      businessManager();
    // } else if (answers.whatFirst === "Add a Department") {
    //   //something
    //   db.query(
    //     `INSERT INTO department (department_name) VALUES ('${answers.addDepartment}')`,
    //     function (err, results) {
    //       console.log("");
    //       console.log("Adding New Department");
    //     }
    //   );
    //   db.query("SELECT * FROM department", function (err, results) {
    //     console.log("");
    //     console.table(results);
    //   });
    //   //then
    //   businessManager();
    // } else if (answers.whatFirst === "Add a Role") {
    //   //something
    //   db.query(
    //     `INSERT INTO role (title, salary, department_id) VALUES ('${answers.addRoleName}', ${answers.addRoleSalary}, ${answers.addRoleDepartment})`,
    //     function (err, results) {
    //       console.log("");
    //       console.log("Adding New Department");
    //     }
    //   );
    //   db.query(
    //     "SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON department.id = role.department_id",
    //     function (err, results) {
    //       console.log("");
    //       console.table(results);
    //     }
    //   );
    //   //then
    //   businessManager();
    // } else if (answers.whatFirst === "Add an Employee") {
    //   //something
    //   db.query(
    //     `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.addEmployeeFname}', '${answers.addEmployeeLname}', ${answers.addEmployeeRole}, ${answers.addEmployeeManager})`,
    //     function (err, results) {
    //       console.log("");
    //       console.log("Adding New Department");
    //     }
    //   );
    //   db.query(
    //     "SELECT employee.Id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON role.id = employee.role_id",
    //     function (err, results) {
    //       console.log("");
    //       console.table(results);
    //     }
    //   );
    //   //then
    //   businessManager();
    // } else if (answers.whatFirst === "Update an Employee Role") {
    //   //something
    //   db.query(
    //     `UPDATE employee SET role_id = '${answers.updateEmployeeRole}' WHERE id = '${answers.updateEmployee}'`,
    //     function (err, results) {
    //       console.log("");
    //       console.log(
    //         `Employee ID: ${answers.updateEmployee} has been updated to Role ID: ${answers.updateEmployeeRole}`
    //       );
    //     }
    //   );
    //   db.query(
    //     "SELECT employee.Id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON role.id = employee.role_id",
    //     function (err, results) {
    //       console.log("");
    //       console.table(results);
    //     }
    //   );
    //   //then
    //   businessManager();
    // } else if (answers.whatFirst === "Update an Employee Manager") {
    //   //something
    //   db.query(
    //     `UPDATE employee SET manager_id = '${answers.updateEmployeeManager}' WHERE id = '${answers.updateManagerofEmployeeID}'`,
    //     function (err, results) {
    //       console.log("");
    //       console.log(
    //         `Employee ID: ${answers.updateManagerofEmployeeID} has been updated to Role ID: ${answers.updateEmployeeManager}`
    //       );
    //     }
    //   );
    //   db.query(
    //     "SELECT employee.Id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON role.id = employee.role_id",
    //     function (err, results) {
    //       console.log("");
    //       console.table(results);
    //     }
    //   );
    //   //then
    //   businessManager();
    // } else if (answers.whatFirst === "Delete a Department") {
    //   db.query(
    //     `DELETE FROM department WHERE id = '${answers.deleteDepartment}'`,
    //     function (err, results) {
    //       console.log("");
    //       console.log("Deleteing a Department");
    //     }
    //   );
    //   db.query("SELECT * FROM department", function (err, results) {
    //     console.log("");
    //     console.table(results);
    //   });
    //   businessManager();
    // } else if (answers.whatFirst === "Delete a Role") {
    //   db.query(
    //     `DELETE FROM role WHERE id ='${answers.deleteRole}'`,
    //     function (err, results) {
    //       console.log("");
    //       console.log("Deleteing a Role");
    //     }
    //   );
    //   db.query(
    //     "SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON department.id = role.department_id",
    //     function (err, results) {
    //       console.log("");
    //       console.table(results);
    //     }
    //   );
    //   businessManager();
    // } else if (answers.whatFirst === "Delete an Employee") {
    //   db.query(
    //     `DELETE FROM employee WHERE id = '${answers.deleteEmployee}'`,
    //     function (err, results) {
    //       console.log("");
    //       console.log("Deleteing an Employee");
    //     }
    //   );
    //   db.query(
    //     "SELECT employee.Id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON role.id = employee.role_id",
    //     function (err, results) {
    //       console.log("");
    //       console.table(results);
    //     }
    //   );
    //   businessManager();
    } else {
      //Stop program
      console.log("Operation completed.");
      process.exit(1);
    }
  });
}

// Starts application and provides a way to quit as well.
function runApp() {
  inquirer.prompt(questions).then((answers) => {
    if (answers.whatFirst === "Exit Application") {
      console.log("Goodbye!");
      process.exit(1)
    } else {
        businessManager();
    }
})
}

// Starts the application
runApp();
