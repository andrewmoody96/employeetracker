USE team_db;

INSERT INTO departments (department_name)
VALUES ("Human Resources"), ("Sales"), ("Customer Service"), ("Web Development"), ("Returns");

INSERT INTO roles (title, salary, department_id)
VALUES ("HR Manager", 60000, 1), ("Recruiter", 30000, 1), ("Sales Representative", 38000, 2), ("Sales Manager", 75000, 2), ("Customer Service Representative", 30000, 3), ("Customer Service Manager", 50000, 3), ("Jr. Web Developer", 50000, 4), ("Sr. Software Engineer", 70000, 4);

INSERT INTO employees (last_name, first_name, role_id, manager)
VALUES ("Reily", "Tim", 1, null), ("Hill", "Timothy", 2, 1), ("Moody", "Andrew", 3, 4), ("Jones", "Jim Bob", 4, null), ("Lewis", "Lonnie", 3, 4), ("Jackson", "Harry", 6, null), ("Gonzales", "Elliot", 5, 6), ("Jacobs", "Jimmy Dean", 5, 6), ("Peterson", "Bill", 8, null), ("Perry", "Larry", 7, 10), ("Loutherback", "Richard", 7, 10);