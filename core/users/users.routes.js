/**
 * Route /users
 */

const { Router } = require('express');
const UsersService = require('./users.service');

const router = Router();
const usersService = new UsersService();

router.get('/', (req, res) => {
  const users = usersService.find();

  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = usersService.findOne(id);

  if (!user) {
    return res.status(404).json({
      ok: false,
      msg: 'User not found'
    });
  }

  res.json(user);
});

router.post('/', (req, res) => {
  const data = req.body;
  const newUser = usersService.create(data);
  res.status(201).json(newUser);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const patchedUser = usersService.update(id, data);
  res.json(patchedUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const result = usersService.delete(id);
  res.json(result);
});

module.exports = router;
