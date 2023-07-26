const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET function for all tags
router.get('/', async (req, res) => {
  await Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.json(err)
  });
});

// GET function for a tag by id
router.get('/:id', async (req, res) => {
  await Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'category_id']
    }
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.json(err)
  });
});

// POST function for new tag
router.post('/', async (req, res) => {
  await Tag.create({
    tag_name: req.body.tag_name
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.json(err)
  });
});

// PUT function to update tag data
router.put('/:id', async (req, res) => {
  await Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then((dbTagData => {
    if(!dbTagData) {
      res.json({ 
        message: 'Tag does not exist with that id!'
      });
      return;
    } else {
      res.json(dbTagData)
    }
  }))
  .catch(err => {
    console.log(err);
    res.json(err)
  });
});

// DELETE function to delete tag by id
router.delete('/:id', async (req, res) => {
  await Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dbTagData => {
    if(!dbTagData) {
      res.json({ 
        message: 'Tag does not exist with that id!'
      });
      return;
    } else {
      res.json(dbTagData)
    }
  }))
  .catch(err => {
    console.log(err);
    res.json(err)
  });
});

module.exports = router;
