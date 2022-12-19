const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbConnect = require('./config/db');
const userRouter = require('./routes/users')
const cors = require('cors')
const dotenv = require('dotenv');
const app = express();
dotenv.config();
dbConnect();

app.use(logger('dev'));
app.use(express.json());
app.use((req, res, next)=>{
    /* en ORIGIN_URL se debe crear un archivo .env y colocar la url desde la que se haran las peticiones */
    res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN_URL);
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use(cors({origin: process.env.ORIGIN_URL}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',userRouter)


module.exports = app;
