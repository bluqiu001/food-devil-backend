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

module.exports = router;
