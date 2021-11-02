const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurantSchema');
const checkAuth = require('../middleware/check-auth');
const Food = require('../../models/foodSchema');

router.get('/', (req, res) => {
  Restaurant.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// router.get('/:restaurantId', (req, res) => {
//   const id = req.params.restaurantId;
//   Restaurant.findById(id)
//     .exec()
//     .then((doc) => {
//       if (doc) {
//         res.status(200).json(doc);
//       } else {
//         res
//           .status(404)
//           .json({ message: 'No restaurant found for provided ID' });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// });

router.get('/:restaurantId', (req, res) => {
  const id = req.params.restaurantId;
  Food.find({ restaurantId: id })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No restaurant found for ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
