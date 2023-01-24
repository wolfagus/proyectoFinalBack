const mongoose = require('mongoose');
const { Schema } = mongoose;

const pagosSchema = new Schema({
    payment_id:{type: String, requird: true},
    status:{type: String, requird: true},
    payment_type:{type: String, requird: true}

    },
    {
    timestamps:true,
    versionKey: false
    }
)

module.exports = mongoose.model('payments',pagosSchema);