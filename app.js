const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbConnect = require('./config/db');
const userRouter = require('./routes/users')
const paymentRouter = require('./routes/payments')
const productsRouter = require("./routes/products");
const cors = require('cors')
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser')
dotenv.config();
dbConnect();
app.use(bodyParser.urlencoded({extended:false}))
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
app.use('/api',paymentRouter)
app.use('/api', productsRouter);




module.exports = app;
