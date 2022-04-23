USE team_db;

INSERT INTO departments (name)
VALUES ("Human Resources"), ("Sales"), ("Customer Service"), ("Web Development"), ("Returns");

INSERT INTO roles (position, salary)
VALUES ("HR Manager", 50000), ("Recruiter", 30000);

INSERT INTO employees (last_name, first_name, position, manager)
VALUES ("Moody", "Andrew", "Sales", "Jim Bob Jones");