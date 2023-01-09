const express = require('express');
const { pagosMP, notificacionPago } = require('../controllers/paymentController');
const router = express.Router();


router.post('/payment', pagosMP)
router.get('/notificacionPayment', notificacionPago)

module.exports = router;