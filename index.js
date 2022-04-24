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