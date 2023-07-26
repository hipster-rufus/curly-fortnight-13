const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET function for all categories
router.get('/', async (req, res) => {
  await Category.findAll({
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.json(err)
  });
});

// GET function for a category by id
router.get('/:id', async (req, res) => {
  await Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'category_id']
    }
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.json(err)
  });
});

// POST function for new category
router.post('/', async (req, res) => {
  await Category.create({
    category_name: req.body.category_name
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.json(err)
  });
});

// PUT function to update category data
router.put('/:id', async (req, res) => {
  await Category.update({
    where: {
      id: req.params.id
    }
  },
  {
    category_name: req.body.category_name
  })
  .then((dbCategoryData => {
    if(!dbCategoryData) {
      res.json({ 
        message: 'Category does not exist with that id!'
      });
      return;
    } else {
      res.json(dbCategoryData)
    }
  }))
  .catch(err => {
    console.log(err);
    res.json(err)
  });
});

// DELETE function to delete catagory by id
router.delete('/:id', async (req, res) => {
  await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dbCategoryData => {
    if(!dbCategoryData) {
      res.json({ 
        message: 'Category does not exist with that id!'
      });
      return;
    } else {
      res.json(dbCategoryData)
    }
  }))
  .catch(err => {
    console.log(err);
    res.json(err)
  });
});

module.exports = router;
