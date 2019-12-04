const express = require('express');

const router = express.Router();
// const db = require('../startup/db');
// const { User, validate } = require('../models/user');
const controller = require('../controllers/userController');

router.get('/', controller.getUsers);

router.get('/:id', controller.getUser);

router.post('/auth/create-user', controller.createUser);

module.exports = router;
