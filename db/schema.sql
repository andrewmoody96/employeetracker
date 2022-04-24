DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;
USE team_db;


CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL UNIQUE,
    department INT,
    FOREIGN KEY (department) REFERENCES departments(id) ON DELETE SET NULL
);

-- CREATE TABLE employees (
--     employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     last_name VARCHAR(30) NOT NULL,
--     first_name VARCHAR(30) NOT NULL,
--     title VARCHAR(50) NOT NULL,
--     FOREIGN KEY (title) REFERENCES roles(title),
--     department VARCHAR(50),
--     FOREIGN KEY (department) REFERENCES roles(department),
--     salary DECIMAL NOT NULL,
--     FOREIGN KEY (salary) REFERENCES roles(salary),
--     manager VARCHAR(30)
-- );

