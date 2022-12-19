const mongoose = require('mongoose');
const { Schema } = mongoose;
const {roles} = require('../utils/enum')

const userSchema = new Schema({
    name: {type: String, requird: true, unique: true},
    email: {type: String, requird: true},
    password: {type: String, requird: true},
    role: {type: String, enum:roles, default: roles.CLIENT},
    isActive: Boolean,
},
{
    timestamps:true,
    versionKey: false,
}
)

module.exports = mongoose.model('users',userSchema);