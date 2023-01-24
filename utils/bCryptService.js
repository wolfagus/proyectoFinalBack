const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const encryptedData = async (data)=>{
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(data, salt)
}

const compareData = async (userData, existData)=>{
    return await bcrypt.compare(userData, existData)
}

module.exports = {encryptedData, compareData};   