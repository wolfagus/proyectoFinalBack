const express = require('express');
const router = express.Router();
const {getAllUsers, createUser,login} = require('../controllers/userController');

/* GET users listing. */
router.get('/users', getAllUsers);
router.post('/users',createUser)
router.post('/login',login)

module.exports = router;
