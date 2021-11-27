const express = require('express')
const router = express.Router()
const Meal = require('../../models/mealSchema')
const checkAuth = require('../middleware/check-auth')
const Food = require('../../models/foodSchema')

router.get('/getUserMeals/:mealId', checkAuth, (req, res) => {
  const id = req.params.mealId
  Meal.find({ user_id: id })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: 'No meal found for provided ID' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
})

router.get('/:mealId', checkAuth, (req, res) => {
  const id = req.params.mealId
  Meal.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: 'No meal found for provided ID' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
})

router.get('/getUserRestaurantMeals', checkAuth, (req, res) => {
  const user_id = req.body.user_id;
  const restaurantId = req.body.restaurantId
  Meal.find({user_id: user_id, restaurants: restaurantId})
  //Expand the food-ids to the food table, grabbing their names 
    .populate({path: 'foods', select: 'name'})
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No meal(s) found for provided user_id and restaurantId' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post('/', checkAuth, async (req, res, next) => {
  var restaurants = []
  await Food.find({
    _id: { $in: req.body.foods },
  })
    .exec()
    .then((doc) => {
      for (const entry of doc) {
        restaurants.push(entry.restaurantId)
      }
    })
    .catch((err) => console.log(err))

  const meal = new Meal({
    user_id: req.body.user_id,
    foods: req.body.foods,
    restaurants: restaurants,
  })

  meal
    .save()
    .then((doc) => {
      res.status(201).json({
        message: 'Meal created',
        createdReview: doc,
      })
    })
    .catch((err) => res.status(500).json(err))
})

router.patch('/:mealId', checkAuth, (req, res, next) => {
  const id = req.params.mealId
  Meal.updateOne(
    { _id: id },
    {
      $set: {
        foods: req.body.foods,
      },
    },
  )
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(500).json(err))
})

router.delete('/:mealId', checkAuth, (req, res, next) => {
  const id = req.params.mealId
  Meal.remove({ _id: id })
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) =>
      res.status(500).json({
        error: err,
      }),
    )
})

module.exports = router
