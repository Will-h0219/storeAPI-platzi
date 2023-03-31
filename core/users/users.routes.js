/**
 * Route /users
 */

const { Router } = require('express');

const { validatorHandler } = require('../../middlewares/validator.handler');
const { createUserSchema, getUserSchema, updateUserSchema } = require('../../schemas/user.schema');
const { successResponse } = require('../../utils/successResponse.util');

const UsersService = require('./users.service');

const router = Router();
const usersService = new UsersService();

router.get('/', (req, res) => {
  const users = usersService.find();

  res.json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  (req, res) => {
    const { id } = req.params;
    const user = usersService.findOne(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found'
      });
    }
    const response = successResponse(user);
    res.json(response);
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  (req, res) => {
    const data = req.body;
    const newUser = usersService.create(data);
    const response = successResponse(newUser, `User ${newUser.id} created`)
    res.status(201).json(response);
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const patchedUser = usersService.update(id, data);
    const response = successResponse(patchedUser);
    res.json(response);
  }
);

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const result = usersService.delete(id);
  res.json(result);
});

module.exports = router;
