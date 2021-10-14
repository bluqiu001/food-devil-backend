const express = require('express');
const router = express.Router();
const Food = require('../../models/foodSchema');

router.get('/', (req, res) => {
  Food.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/:foodId', (req, res) => {
  const id = req.params.foodId;
  Food.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: 'No food found for provided ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});


module.exports = router;
