const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const { promisify } = require('util');
const User = require('./models/user');


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "joIS180301--",
    database: "coffeemdb",
});

module.exports = db;