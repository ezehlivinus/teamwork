const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin'); // user this after testing

const controller = require('../controllers/userController');

router.get('/', controller.getUsers);

router.get('/:id', controller.getUser);

router.post('/auth/create-user', auth, controller.createUser);

module.exports = router;
