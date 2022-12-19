const User = require('../models/UserModel');

const userService = {
      createUser: async (user)=>{ 
        const newUser = new User(user)
        await newUser.save();
    }
}

module.exports= {userService};