const { userService } = require("../services/userServices");
const User = require("../models/UserModel");
const { encryptedData, compareData } = require("../utils/bCryptService");
const { token } = require("../utils/jwtService");
const { findOneAndUpdate } = require("../models/UserModel");
const { ObjectId } = require("mongoose").Types;
const { sendNodeMailer } = require("../services/sendgrid");

// ESTA OPCION SIRVE PARA TRAER TODOS LOS USUARIOS
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

// ESTA OPCION SIRVE PARA TRAER UN SOLO USUARIO POR ID
const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Id invalido");
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("El usuario no existe");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

// ESTA OPCION SIRVE PARA CREAR EL USUARIO
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encrypPassword = await encryptedData(password);
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(409).send("el email ya se encuentra registrado");
    }
    const saveUser = {
      ...req.body,
      password: encrypPassword,
      isActive: false,
      isDeleted: false,
    };
    const newUser = await userService.createUser(saveUser);
    const activeToken = token({ id: newUser._id, role: newUser.role });

    sendNodeMailer({
      userEmail: saveUser.email,
      subject: "Confirmacion de correo electronico",
      htmlMsg: `<p>${saveUser.name}, por favor haga click en el siguiente enlace para 
        confirmar su correo electronico. haga</p> <a href=${process.env.APP_BACK_URL}${newUser._id}>click aqui</a>`,
    });
    return res.status(201).json(activeToken);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

// ESTA OPCION SIRVE PARA LOGUEAR EL USUARIO, DEBE ESTAR EN EL MAIL VALIDADO, EN CASO DE QUE ESTE
// TODO OK, SE DEVUELVE UN TOKEN CON 24 HORAS DE DURACION
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(404).send("el usuario no existe");
    }
    const authorizedUser = await compareData(password, userFound.password);
    if (!authorizedUser) {
      return res.status(400).send("credenciales invalidas");
    }
    if (!userFound.isActive) {
      return res.status(403).json("Not verfied account");
    }
    const activeToken = token({ id: userFound._id, role: userFound.role });
    res.status(200).json({activeToken, userFound});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// ESTA OPCION SIRVE PARA ELIMINAR UN USUARIO CON EL ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const todayDate = new Date();
  const deleteStatus = {
    deleteAt: todayDate,
    isDeleted: true,
    isActive: false,
  };
  try {
    const deleteUser = await User.findOneAndUpdate({ _id: id }, deleteStatus);
    if (!ObjectId.isValid(id)) {
      res.status(400).send("Id invalido");
    }
    if (deleteUser) {
      res.status(200).send("El usuario fue eliminado exitosamente");
    } else {
      res.status(404).send("No se encontro el usuario solicitado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// ESTA OPCION SIRVE PARA EDITAR UN USUARIO
const editUser = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      res.status(400).send("Id invalido");
    }
    const userFound = await User.findById(id);
    const encrypPassword = await encryptedData(
      body.password || userFound.password
    );
    const updateUser = await User.findOneAndUpdate(
      { _id: id },
      { ...body, password: encrypPassword },
      { new: true }
    );
    if (updateUser) {
      return res.status(200).json(updateUser);
    } else {
      res.status(404).send("No se encontro el usuario solicitado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// ESTA OPCION ES PARA QUE SE VERIFIQUE EL MAIL, CAMBIANDO EL isActive a true
const activeAccount = async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ID no valido");
    }
    const activeUser = await User.findOneAndUpdate(
      { _id: id },
      { isActive: true },
      { new: true }
    );
    if (activeUser) {
      res.status(200).json(activeUser);
    } else {
      res.status(404).json("El usuario no existe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  getAllUsers,
  createUser,
  login,
  deleteUser,
  getOneUser,
  editUser,
  activeAccount,
};
