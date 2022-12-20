const {userService} = require('../services/userServices')
const User = require('../models/UserModel');
const {encryptedData, compareData} = require('../utils/bCryptService');
const { token } = require('../utils/jwtService');

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
    const newUser = await userService.createUser(saveUser)  
    const activeToken = token({id: newUser._id, role: newUser.role});
        return res.status(201).json(activeToken)
    } catch(error) {
        console.log(error)
        res.status(500).json('Internal Server Error');
    }
}

const login = async (req,res)=>{
    try {
        const {email, password}= req.body;
        const userFound = await User.findOne({email});
        if(!userFound){
            return res.status(404).send('el usuario no existe')
        }
        const authorizedUser = await compareData(password, userFound.password)
        if(!authorizedUser){
            return res.status(400).send('credenciales invalidas')
        }
        const activeToken = token({id: userFound._id, role: userFound.role});
        res.status(200).json(activeToken)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}
module.exports = {getAllUsers, createUser,login}