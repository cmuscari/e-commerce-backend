const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', (req, res) => {
  Category.findAll({
    // include products associated with each category
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
      .then(categoryData => res.json(categoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  })
});


// GET a single category by id number
router.get('/:id', (req, res) => {
  Category.findOne({
    // include products associated with that category
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ],
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


















router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
