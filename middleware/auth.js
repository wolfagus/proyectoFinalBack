const User = require("../models/UserModel");
const { getToken, verifiedToken } = require("../utils/jwtService")


// VERIFICA QUE EL USUARIO ESTE LOGUEADO Y EL TOKEN AUN VIGENTE
const isLoggedIn = async (req, res, next)=>{
    const token = getToken(req);
    if(!token){
        return res.status(401).send('Usuario no autorizado')}
    try {
        const tokenDecode = verifiedToken(token);
        const userFound = await User.findById(tokenDecode.id);
        if(!userFound){
            res.status(401).send('El usuario no existe o no esta autorizado');
        } else { next(); }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}


// VERIFICA QUE EL USUARIO ESTE LOGUEADO,  EL TOKEN AUN VIGENTE Y ADEMAS QUE EL ROLE DEL USUARIO SEA ADMIN 
const checkRole = ()=>{
    try {
        return async (req, res, next)=>{
            const token = getToken(req);
            console.log(token)
            if(!token) {return res.status(400).send('Usuario no autorizado')}
            const tokenDecode = verifiedToken(token);
            const userFound = await User.findById(tokenDecode.id)
            if(userFound.role == "ADMIN"){
                next();
            } else {  res.status(401).send('Usuario no autorizado'); }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {isLoggedIn, checkRole}