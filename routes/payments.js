const express = require('express');
const { pagosMP, notificacionPago } = require('../controllers/paymentController');
const router = express.Router();


router.get('/payment/:id', pagosMP)
router.get('/notificacionPayment/:datos', notificacionPago)

module.exports = router;