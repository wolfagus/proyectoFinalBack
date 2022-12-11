const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbConnect = require('./config/db');
const cors = require('cors')
const dotenv = require('dotenv');
const app = express();
dotenv.config();
dbConnect();

app.use(logger('dev'));
app.use(express.json());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN_URL);
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
