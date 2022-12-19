const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: String, requird: true, unique: true},
    email: {type: String, requird: true},
    password: {type: String, requird: true},
    role: String,
    isActive: Boolean,
},
{
    timestamps:true,
    versionKey: false,
}
)

module.exports = mongoose.model('users',userSchema);