DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;
USE team_db;

DROP TABLE IF EXISTS departments, roles, employees;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    position VARCHAR(50) NOT NULL,
    FOREIGN KEY (department)
    REFERENCES (departments.name)
    ON DELETE SET NULL,
    salary NUMERIC (6,0)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    -- need to setup foreign key to reference roles table
    position VARCHAR(50) NOT NULL,
    -- need to setup foreign keys to reference department table
    FOREIGN KEY (department)
    REFERENCES (roles.department),
    FOREIGN KEY (salary)
    REFERENCES (roles.salary),
    manager VARCHAR(30)
);

