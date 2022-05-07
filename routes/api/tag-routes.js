const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', (req, res) => {
  Tag.findAll({
    // include products associated with each tag
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


// GET a single tag by id number
router.get('/:id', (req, res) => {
  Tag.findOne({
    // include products associated with that tag
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
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// CREATE a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then(tagData => {
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE a tag name
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


// DELETE a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (tagData === 0) {
        res.status(404).json({message: "No tag found with that id"})
      } else {
        res.json(tagData);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


module.exports = router;
