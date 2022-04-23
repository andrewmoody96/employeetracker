const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();

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

// Queries database to show all of the departments.
app.get("/api/departments", (req, res) => {
    db.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        else {
            res.json(results);
        }
    });
});

// Queries database to show all of the roles.
app.get("/api/roles", (req, res) => {
    db.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        else {
            res.json(results);
        }
    });
});

// Queries database to show all of the employees.
app.get("/api/employees", (req, res) => {
    db.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        else {
            res.json(results);
        }
    });
});




// Returns 404 for a query failure.
app.use((req, res) => {
  res.status(404).end();
});

// Tells server to listen on our defined PORT
app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
});