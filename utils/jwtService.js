const jwt = require('jsonwebtoken');


const jwtOptions = { algorithm: 'HS256', expiresIn: '24h' };
const token = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
}

const getToken = (req)=>{
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const verifiedToken = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET)
}


module.exports= {token, getToken, verifiedToken};