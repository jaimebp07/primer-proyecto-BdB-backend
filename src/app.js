const express = require("express");
const bodyParser = require('body-parser');
const path = require('path')
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const myConnection = require('express-myconnection');
const customerRoutes = require('./routes/customer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(myConnection(mysql, {
    host:"jb-rds.cfuhh7iuk0f6.us-east-1.rds.amazonaws.com",
    port:"3306",
    user:"admin",
    password:"contraDB07*",
    database:"primera_db_bdb"
}));

// routes
app.use('/', customerRoutes);

//
app.use(express.static(path.join(__dirname, 'public')));

app.listen(7000, () => {
    console.log(`Server is up and running on 7000 ...`);
});