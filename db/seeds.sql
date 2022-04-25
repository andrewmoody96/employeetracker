USE team_db;

INSERT INTO departments (name)
VALUES ("Human Resources"), ("Sales"), ("Customer Service"), ("Web Development"), ("Returns");

INSERT INTO roles (title, salary)
VALUES ("HR Manager", 60000), ("Recruiter", 30000), ("Sales Representative", 38000), ("Sales Manager", 75000);

INSERT INTO employees (last_name, first_name, role_id, manager)
VALUES ("Moody", "Andrew", 2, 2), ("Jones", "Jim Bob", 3, null);