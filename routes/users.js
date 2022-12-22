const express = require('express');
const router = express.Router();
const {getAllUsers, createUser,login, deleteUser,getOneUser,editUser} = require('../controllers/userController');

/* GET users listing. */
router.get('/users', getAllUsers);
router.get('/user/:id', getOneUser)
router.post('/registerUser',createUser);
router.post('/login',login);
router.patch('/editUser/:id', editUser)
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
