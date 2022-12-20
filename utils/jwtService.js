const jwt = require('jsonwebtoken');
const jwtOptions = { algorithm: 'HS256', expiresIn: '24h' };
const token = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
}

module.exports= {token};