const express = require('express');

const router = express.Router();
const auth = require('../middleware/authenticate');
const admin = require('../middleware/admin'); // user this after testing
const canEdit = require('../middleware/authorise');
const validate = require('../middleware/validate');
const { validateUser, signin } = require('../models/user');

const controller = require('../controllers/userController');

router.get('/', controller.getUsers);

router.get('/:id', controller.getUser);

router.post(
  '/auth/create-user',
  [auth, admin, validate(validateUser)],
  // validate(validateUser),
  controller.createUser
);

router.post('/auth/signin', [validate(signin)], controller.signin);

router.patch('/:id', [auth, canEdit, validate(validateUser)], controller.editUser);

router.delete('/:id', auth, controller.deleteUser);

module.exports = router;
