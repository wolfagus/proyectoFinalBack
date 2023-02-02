const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoSchema = new Schema(
  {
    title: { type: String, require: true },
    detalles: { type: [], require: true },
    price: { type: Number, require: true },
    description: { type: String },
    email: { type: String, require: true },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const pedidos = mongoose.model("pedidos", pedidoSchema);
module.exports = pedidos;
