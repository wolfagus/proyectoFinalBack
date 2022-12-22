const mongoose = require('mongoose');
const { Schema } = mongoose;
const {roles} = require('../utils/enum')

const userSchema = new Schema({
    name: {type: String, requird: true, unique: true},
    email: {type: String, requird: true},
    password: {type: String, requird: true},
    address: String,
    province: String,
    role: {type: String, enum:roles, default: roles.CLIENT},
    deleteAt: Date,
    isDeleted: Boolean,
    isActive: Boolean,
},
{
    timestamps:true,
    versionKey: false,
}
)

module.exports = mongoose.model('users',userSchema);