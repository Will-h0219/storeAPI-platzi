/**
 * Route /products
 */

const { Router } = require('express');

const { validatorHandler } = require('../../middlewares/validator.handler');
const { createProductSchema, getProductSchema, updateProductSchema } = require('../../schemas/product.schema');
const { successResponse } = require('../../utils/successResponse.util');

const ProductsService = require('./product.service');

const router = Router();
const productService = new ProductsService();

router.get('/', async (req, res) => {
  const products = await productService.find();

  res.json(products);
});

// Endpoints especificos deben ir antes que endpoints dinamicos
router.get('/filter', (req, res) => {
  res.json({
    ok: true,
    msg: 'Yo soy un filter'
  });
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params; // tal como se define en la ruta es como se recibe
      const product = await productService.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await productService.create(body);
    const response = successResponse(newProduct, 'Product created');

    res.status(201).json(response);
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await productService.update(id, body);
      const response = successResponse(product);

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.delete(id);

    res.json(product);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Something went wrong',
      error: error.message
    });
  }
});

module.exports = router;
