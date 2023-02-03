const mercadopago = require("mercadopago");
const pedidos = require("../models/pedidosModel");
const dotenv = require('dotenv');

mercadopago.configure({
    access_token: process.env.TOKEN_MP,
  });

const Pagos = require('../models/Pagos')
const {userService} = require('../services/userServices');
const { sendNodeMailer } = require("../services/sendgrid");

const pagosMP = async (req,res)=>{
  const  {id}  = req.params;
  const pedidoId = await pedidos.findById(id)
  
    const preference = {
        items: [
          {

            // cuando se envia el req.body en description: es el titulo del producto
            // en unit_price: es el precio del producto y en quantity: es la cantidad de productos
            title: pedidoId.title ,
            unit_price: pedidoId.price ,
            quantity: 1 ,
          },
        ],
        back_urls: {
          "success": `http://localhost:4000/api/notificacionPayment/${pedidoId.email}`,
          "failure": `http://localhost:4000/api/notificacionPayment/${pedidoId.email}`,
          "pending": `http://localhost:4000/api/notificacionPayment/${pedidoId.email}`
        },
        auto_return: "approved",

      };
      
      mercadopago.preferences.create(preference)
        .then((r)=> {
          // EL r.body.init_point ES EL LINK QUE DEVUELVE PARA PODER REALIZAR EL PAGO
          res.status(200).json(r.body.init_point)
        })
        .catch((error)=> {
          console.log(error);
        });
}


// una vez que se realiza el pago se ejecuta de manera automatica un GET de esta funcion que se devuelve
// el estado de el pago y ademas lo guarda en la base de datos
const notificacionPago = async (req, res) =>{
    try {
      const userEmail = req.params
    
      sendNodeMailer({
        userEmail: userEmail.datos,
        subject: "Notificacion de pago",
        htmlMsg: `<p> El estado de su pago del pedido es ${req.query.status}</p>`,
      })
      const {payment_id, status, payment_type } = req.query;
      const dataPayment = {
        payment_id: payment_id,
        status:status,
        payment_type:payment_type
      }
      const savePayment = await userService.createPayment(dataPayment)
      res.status(200).json(savePayment.status);
    } catch (error) {
        console.log(error);
    }
   
}

module.exports = {pagosMP, notificacionPago}