const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoriesList = await Category.findAll({
      include: [{model: Product}],
    });
    console.log('category-routes GET');
    res.status(200).json({ message: 'Categories found', data: categoriesList, });
  } catch (err) {
    console.error(err);
    console.log('category-routes GET');
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryById) {
      res.status(404).json({ message: 'No category found witht that ID!' });
      return;
    }
    console.log('category-routes GET by id');
    res.status(200).json({ message: 'Category found', data: categoryById, });
  } catch (err) {
    console.error(err);
    console.log('category-routes GET by id');
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    console.log('category-routes POST');
    res.status(200).json({ message: 'New category created', data: newCategory, });
  } catch (err) {
    console.error(err);
    console.log('category-routes POST');
    res.status(500).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
try {
  const updateCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  console.log('category-routes PUT');
  if (!updateCategory) {
    res.status(404).json({ message: 'No category found witht that ID!' });
    return;
  }
  res.status(200).json({ message: 'Category updated' })
} catch (err) {
  console.error(err);
  console.log('category-routes PUT');
  res.status(500).json(err);
}
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found witht that ID!' })
    }
    console.log('category-routes DELETE');
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    console.error(err);
    console.log('category-routes DELETE');
  }
  // delete a category by its `id` value
});

module.exports = router;
