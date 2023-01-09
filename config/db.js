const mongoose = require('mongoose');

const connectDb = ()=> {
    /*en MONGO_CONNECTION_STRING se debe crear un archivo .env y cologar el mongo uris para conectarse*/
    try {
        mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDb;