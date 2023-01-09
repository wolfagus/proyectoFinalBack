const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: "TEST-2765723855854915-122620-e57d7dd3f238667ccf444dda4e6ba8ec-171875479",
  });

const Pagos = require('../models/Pagos')
const {userService} = require('../services/userServices')

const pagosMP = async (req,res)=>{
    const preference = {
        items: [
          {

            // cuando se envia el req.body en description: es el titulo del producto
            // en unit_price: es el precio del producto y en quantity: es la cantidad de productos
            title: req.body.description ,
            unit_price: Number(req.body.unit_price) ,
            quantity:Number(req.body.quantity) ,
          },
        ],
        back_urls: {
          "success": "http://localhost:4000/api/notificacionPayment",
          "failure": "http://localhost:4000/api/notificacionPayment",
          "pending": "http://localhost:4000/api/notificacionPayment"
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
      const {payment_id, status, payment_type } = req.query;
      const dataPayment = {
        payment_id: payment_id,
        status:status,
        payment_type:payment_type
      }
      const savePayment = await userService.createPayment(dataPayment)
      res.status(200).json(savePayment);
    } catch (error) {
        console.log(error);
    }
   
}

module.exports = {pagosMP, notificacionPago}