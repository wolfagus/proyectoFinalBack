const express = require('express');
const router = express.Router();
const {getAllUsers, createUser,login, deleteUser,getOneUser,editUser} = require('../controllers/userController');
const { isLoggedIn, checkRole } = require('../middleware/auth');
const {roles} = require('../utils/enum')

/* GET users listing. */
router.get('/users', checkRole(roles.ADMIN), getAllUsers);
router.get('/user/:id', checkRole(roles.ADMIN),  getOneUser)
router.post('/registerUser',createUser);
router.post('/login',login);
router.put('/editUser/:id', isLoggedIn, editUser)
router.delete('/deleteUser/:id', checkRole(roles.ADMIN), deleteUser);

module.exports = router;
