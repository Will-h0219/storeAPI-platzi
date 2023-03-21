/**
 * Route /users
 */

const { Router } = require('express');
const { faker } = require('@faker-js/faker');

const router = Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.status(400).json({
      ok: false,
      msg: 'Parametros invalidos'
    });
  }
});

module.exports = router;
