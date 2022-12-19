const User = require('../models/UserModel')

const getAllUsers = async (req, res)=> {
    
    try{
        const user = await User.find();
        res.status(200).json(user);
    } catch(error) {
        console.log(error)
        res.status(500).json('Internal Server Error');
    }
}

module.exports = {getAllUsers}