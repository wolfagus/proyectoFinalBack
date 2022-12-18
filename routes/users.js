const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/userController');

/* GET users listing. */
router.get('/users', getAllUsers);

module.exports = router;
