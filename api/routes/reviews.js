const express = require('express')
const router = express.Router()
const Reviews = require('../../models/reviewSchema')
const checkAuth = require('../middleware/check-auth')
const mongoose = require('mongoose')

router.get('/', (req, res) => {
  Reviews.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs)
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
})

router.get('/getRestaurantReviews/:restaurantId', (req, res) => {
  const id = req.params.restaurantId
  Reviews.find({ restaurant_id: id })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: 'No review found for provided ID' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
})

router.get('/:reviewId', (req, res) => {
  const id = req.params.reviewId
  Reviews.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: 'No review found for provided ID' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
})

router.post('/', checkAuth, (req, res, next) => {
  const userid = mongoose.Types.ObjectId(req.body.user_id)
  const restaurantid = mongoose.Types.ObjectId(req.body.restaurant_id)
  Reviews.countDocuments(
    { user_id: userid, restaurant_id: restaurantid },
    function (err, count) {
      if (err) {
        res.status(500).json(err)
        return
      }
      if (count > 0) {
        res
          .status(500)
          .json({ message: 'User already reviewed this restaurant' })
      } else {
        const review = new Reviews({
          user_id: req.body.user_id,
          restaurant_id: req.body.restaurant_id,
          description: req.body.description,
          stars: req.body.stars,
          is_anonymous: req.body.is_anonymous,
        })
        review
          .save()
          .then((doc) => res.status(200).json(doc))
          .catch((err) => res.status(500).json(err))
      }
    },
  )
})

router.patch('/:reviewId', checkAuth, (req, res, next) => {
  const id = req.params.reviewId
  Reviews.updateOne(
    { _id: id },
    {
      $set: {
        description: req.body.description,
        stars: req.body.stars,
        is_anonymous: req.body.anonymous,
      },
    },
    { new: true },
  )
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(500).json(err))
})

router.patch('/upvote/:reviewId', checkAuth, (req, res, next) => {
  const id = req.params.reviewId
  Reviews.findOneAndUpdate({ _id: id }, { $inc: { helpful: 1 } }, { new: true })
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(500).json(err))
})

router.patch('/downvote/:reviewId', checkAuth, (req, res, next) => {
  const id = req.params.reviewId
  Reviews.findOneAndUpdate(
    { _id: id },
    { $inc: { unhelpful: 1 } },
    { new: true },
  )
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(500).json(err))
})

router.delete('/:reviewId', checkAuth, (req, res, next) => {
  const id = req.params.reviewId
  Reviews.remove({ _id: id })
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) =>
      res.status(500).json({
        error: err,
      }),
    )
})

module.exports = router
