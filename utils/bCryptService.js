const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const encryptedData = async (data)=>{
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(data, salt)
}

module.exports = {encryptedData};   