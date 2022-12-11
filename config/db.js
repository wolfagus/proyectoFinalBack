const mongoose = require('mongoose');

const connectDb = ()=> {
    try {
        mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDb;