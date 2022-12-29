const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: "APP_USR-2765723855854915-122620-b7685317e1a6991d8f76af7bd0b1ed48-171875479",
  });

const pagosMP = async (req,res)=>{
    const preference = {
        items: [
          {
            title: "Mi producto",
            unit_price: 100,
            quantity: 1,
          },
        ],
        notification_URL:"http://localhost:4000/api/notificacionPayment"
      };
      
      mercadopago.preferences.create(preference)
        .then((r)=> {
          // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
            console.log(r.body)
          res.status(200).json(r.body.sandbox_init_point)
        })
        .catch((error)=> {
          console.log(error);
        });
}

const notificacionPago = async (req, res) =>{
    try {
         const datos = req.query;
    console.log(datos);
    res.status(200).json(datos);

    } catch (error) {
        console.log(error);
    }
   
}

module.exports = {pagosMP, notificacionPago}