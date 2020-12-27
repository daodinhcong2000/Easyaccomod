const express = require('express');
const router = express.Router();

const landlordCreate = require('../app/validate/landlord.validate')
const RegisterLandlordController = require('../app/controllers/registerLandlordController')
const AuthClassify = require('../app/middlewares/auth.classify.middleware')
const AuthLandlord = require('../app/middlewares/auth.landlord.middleware')
const upload = require('../app/middlewares/multipleUploadMiddleware')
const createRoom = require('../app/controllers/createRoomController')
const roomValidate = require('../app/validate/room.validate')
const roomEditValidate = require('../app/validate/room.edit.validate')
const AuthDeleteImage = require('../app/middlewares/auth.deleteImage')
const AuthRoom = require('../app/middlewares/auth.room')
const AuthUpdateRoom = require('../app/middlewares/auth.updateRoom.middleware');
const UpdateRoomController = require('../app/controllers/updateRoomController')
const LandlordController = require('../app/controllers/landlordController')
const AuthStatisticalRoom = require('../app/middlewares/auth.statisticalRoom.middleware')


router.get('/register' , RegisterLandlordController.create)
router.post('/register/store' ,landlordCreate.postCreate ,AuthClassify.checkDuplicate , RegisterLandlordController.store)
router.get('/editAccount' , AuthLandlord.authClassify , RegisterLandlordController.getEditAccount)
router.put('/editAccount/store' , AuthLandlord.authClassify, landlordCreate.postCreate, RegisterLandlordController.editAccount)
router.get('/createRoom' , AuthLandlord.authClassify ,createRoom.getCreateRoom)
router.post('/costNotifi' , AuthLandlord.authClassify , createRoom.costNotifi);
router.post('/createRoom/store' , upload, AuthLandlord.authClassify , roomValidate.postCreate , createRoom.createRoom)
router.get('/editRoom' , AuthLandlord.authClassify , AuthRoom.authRomm, createRoom.getEditRoom)
router.put('/editRoom/store' , upload, AuthLandlord.authClassify , AuthRoom.authRomm , roomEditValidate.putEdit, AuthDeleteImage.deleteImage, createRoom.editRoom );
router.put('/updateFillRoom/store', AuthLandlord.authClassify , AuthUpdateRoom.authUpdateRoom, UpdateRoomController.updateFillRoom )
router.post('/extendRoom' , AuthLandlord.authClassify, AuthUpdateRoom.authUpdateRoom , UpdateRoomController.extendRoom)
router.get('/getNotification' , AuthLandlord.authClassify , LandlordController.getNotifi);
router.post('/getstatistical' , AuthLandlord.authClassify , AuthStatisticalRoom.authStatisticalRoom, LandlordController.getStatisticalView)
//router.post('createRoom' , upload , AuthLandlord.authClassify , roomValidate.postCreate , createRoom.createRoom)


module.exports = router;