/**
 * Route /products
 */

const { Router } = require('express');
const { faker } = require('@faker-js/faker');

const router = Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    })
  }

  res.json(products);
});

// Endpoints especificos deben ir antes que endpoints dinamicos
router.get('/filter', (req, res) => {
  res.json({
    ok: true,
    msg: 'Yo soy un filter'
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params; // tal como se define en la ruta es como se recibe

  if (id === '999') {
    res.status(404).json({
      ok: false,
      msg: 'not found'
    });
  } else {
    res.json({
      id,
      name: 'Product',
      price: 1000
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: 'Created',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'update',
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: 'Deleted',
    id
  });
});

module.exports = router;
