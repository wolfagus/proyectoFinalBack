const mongoose = require("mongoose");

const connectDb = () => {
  /*en MONGO_CONNECTION_STRING se debe crear un archivo .env y cologar el mongo uri para conectarse*/
  try {
    mongoose.createConnection(process.env.MONGO_CONNECTION_STRING);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
