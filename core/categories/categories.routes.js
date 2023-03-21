/**
 * Route /categories
 */

const { Router } = require('express');
const CategoriesService = require('./categories.service');

const router = Router();
const categoriesService = new CategoriesService();

router.get('/', (req, res) => {
  const categories = categoriesService.find();

  return res.json(categories);
});

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const category = categoriesService.findOne(categoryId);

  if (!category) {
    return res.status(404).json({
      ok: false,
      msg: 'Category not found'
    });
  }

  res.json(category);
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  const newCategory = categoriesService.create(body);
  res.status(201).json(newCategory);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const patchedCategory = categoriesService.update(id, body);
  res.json(patchedCategory);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedCategory = categoriesService.delete(id);
  res.json(deletedCategory);
});

module.exports = router;
