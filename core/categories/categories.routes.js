/**
 * Route /categories
 */

const { Router } = require('express');
const { faker } = require('@faker-js/faker');

const router = Router();

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

module.exports = router;
