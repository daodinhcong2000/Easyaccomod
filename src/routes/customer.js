// routing cac tac vu khach hang
const express = require('express');
const router = express.Router();


const Customerontroller = require('../app/controllers/CustomerController');
const AuthCustomer = require('../app/middlewares/auth.customer.middleware')
const customerCreate = require('../app/validate/custumer.validate')
const RegisterCustomerController = require('../app/controllers/registerCustomerController')
const AuthClassify = require('../app/middlewares/auth.classify.middleware')

//CREATE customer
router.post('/register/store', customerCreate.postCreate, AuthClassify.checkDuplicate , RegisterCustomerController.store );
router.get('/register', RegisterCustomerController.creat);
router.post('/like' ,AuthCustomer.authClassify , Customerontroller.likeNews)
router.post('/comment' , AuthCustomer.authClassify ,Customerontroller.comment )




module.exports = router;