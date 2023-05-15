const { Router } = require('express');

const productsRouter = require('../core/products/products.routes');
const usersRouter = require('../core/users/users.routes');
const categoriesRouter = require('../core/categories/categories.routes');
const ordersRouter = require('../core/orders/orders.routes');

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', ordersRouter);
}

module.exports = routerApi;
