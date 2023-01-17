require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDbMenu = () => {
  try {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING_MENU);
    console.log("conectado a la base de datos MENU");
  } catch (error) {
    console.log("ERROR DB2: ", error);
  }
};

module.exports = connectDbMenu;
