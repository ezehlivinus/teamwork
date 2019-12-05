const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin'); // user this after testing
const validate = require('../middleware/validate');
const { validateUser } = require('../models/user');

const controller = require('../controllers/userController');

router.get('/', controller.getUsers);

router.get('/:id', controller.getUser);

router.post(
  '/auth/create-user',
  // [auth, validate(validateUser)],
  validate(validateUser),
  controller.createUser
);

router.post('/auth/', controller.login);

module.exports = router;
