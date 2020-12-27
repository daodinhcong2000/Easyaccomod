const express = require('express');
const router = express.Router();

const admincontroller = require('../app/controllers/adminController');
const AuthAdmin = require('../app/middlewares/auth.admin.middleware');
const AuthConfirmRoom = require('../app/middlewares/auth.confirmRoom.middleware');
const roomValidate = require('../app/validate/room.validate');
const upload = require('../app/middlewares/multipleUploadMiddleware')



router.get('/manageLandlord' , AuthAdmin.authClassify , admincontroller.manageLandlord);
router.get('/manageRoom' , AuthAdmin.authClassify , admincontroller.manageRoom);
router.get('/manageExtend' , AuthAdmin.authClassify , admincontroller.manageExtend);
router.get('/getLandlord' , AuthAdmin.authClassify   , admincontroller.getLandlord);
router.put('/confirmLandlord', AuthAdmin.authClassify , admincontroller.confirmLanlord);
router.get('/getRooms' , AuthAdmin.authClassify, admincontroller.getRooms);
router.put('/confirmRoom' , AuthAdmin.authClassify , AuthConfirmRoom.authConfirmRoom , admincontroller.confirmRoom);
router.put('/notBrowseRoom' , AuthAdmin.authClassify, AuthConfirmRoom.authConfirmRoom , admincontroller.notBrowseRoom);
router.post('/createRoom/store' , upload, AuthAdmin.authClassify , roomValidate.postCreate , admincontroller.adminCreateRoom);
router.get('',AuthAdmin.authClassify ,admincontroller.show);;

module.exports = router;