const User = require('../models/UserModel');

const userService = {
      createUser: async (user)=>{ 
        const newUser = new User(user)
        return await newUser.save();
    }
}

module.exports= {userService};