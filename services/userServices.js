const User = require('../models/UserModel');
const Pagos = require('../models/Pagos')

const userService = {
      createUser: async (user)=>{ 
        const newUser = new User(user)
        return await newUser.save();
    },
    createPayment: async (user)=>{ 
      const newUser = new Pagos(user)
      return await newUser.save();
  }

}

module.exports= {userService};