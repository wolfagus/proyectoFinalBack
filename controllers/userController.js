const {userService} = require('../services/userServices')
const User = require('../models/UserModel');
const {encryptedData} = require('../utils/bCryptService')

const getAllUsers = async (req, res)=> {
    try{
        const user = await  User.find();
        res.status(200).json(user);
    } catch(error) {
        console.log(error)
        res.status(500).json('Internal Server Error');
    }
}

const createUser = async (req,res)=> {
    try{
        const {email, password} = req.body;
        const encrypPassword = await encryptedData(password)
        const userFound = await User.findOne({email});
    if( userFound ){
        return res.status(409).send('el email ya se encuentra registrado')
       }
       const saveUser = {
        ...req.body,
        password:encrypPassword,
        isActive:true,
    }
    await userService.createUser(saveUser)  
        res.status(201).send('el usuario fue creado con exito')
    } catch(error) {
        console.log(error)
        res.status(500).json('Internal Server Error');
    }
   
}
module.exports = {getAllUsers, createUser}