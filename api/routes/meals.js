const express = require('express');
const router = express.Router();
const Meal = require('../../models/mealSchema');

router.get('/', (req, res) => {
  Meal.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/:mealId', (req, res) => {
  const id = req.params.mealId;
  Meal.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: 'No meal found for provided ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.patch('/:mealId', (req, res, next) => {
    const id = req.params.mealId;
    Meal.updateOne(
      { _id: id },
      {
        $set: {
            foods: req.body.foods
        },
      }
    )
      .exec()
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(500).json(err));
  });

router.delete('/:mealId', (req, res, next) => {
    const id = req.params.mealId;
    Meal.remove({ _id: id })
      .exec()
      .then((doc) => res.status(200).json(doc))
      .catch((err) =>
        res.status(500).json({
          error: err,
        }),
      );
  });

module.exports = router;
