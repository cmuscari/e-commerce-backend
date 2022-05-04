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
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
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


// CREATE a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then(categoryData => {
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE a category name
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// DELETE a category
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (categoryData === 0) {
        res.status(404).json({message: "No category found with that id"})
      } else {
        res.json(categoryData);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
