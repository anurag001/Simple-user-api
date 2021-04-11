const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
const validJWT = require('../app/api/middleware/validate');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/userList/firstName/:name/:page?', validJWT.validJWTNeeded, userController.userListFirstName);
router.get('/userList/lastName/:name/:page?', validJWT.validJWTNeeded, userController.userListLastName);
router.get('/userList/employee/:id/:page?', validJWT.validJWTNeeded, userController.userListEmployee);

module.exports = router;