const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const app = express();
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  console.log("Connected to the employees_db database.")
);