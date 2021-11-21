const express = require('express');
const router = express.Router();
const Reviews = require('../../models/reviewSchema');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res) => {
  Reviews.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/getRestaurantReviews/:restaurantId', checkAuth, (req, res) => {
  const id = req.params.restaurantId;
  Reviews.find({restaurant_id: id})
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No review found for provided ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/:reviewId', checkAuth, (req, res) => {
  const id = req.params.reviewId;
  Reviews.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No review found for provided ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post('/', checkAuth, (req, res, next) => {
  const id = req.params.reviewId;
  const review = new Reviews({
    user_id: req.body.user_id,
    restaurant_id: req.body.restaurant_id,
    description: req.body.description,
    stars: req.body.stars,
    is_anonymous: req.body.is_anonymous,
  });
  review
    .save()
    .then((doc) => {
      res.status(201).json({
        message: 'Review created',
        createdReview: doc,
      });
    })
    .catch((err) => console.log(err));
});

router.patch('/:reviewId', checkAuth, (req, res, next) => {
  const id = req.params.reviewId;
  Reviews.updateOne(
    { _id: id },
    {
      $set: {
        description: req.body.description,
        stars: req.body.stars,
        is_anonymous: req.body.anonymous,
      },
    },
  )
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(500).json(err));
});

router.patch('/upvote/:reviewId', checkAuth, (req, res, next) => {
  const id = req.params.reviewId;
  Reviews.findOneAndUpdate(
    {_id :id}, 
    {$inc : {'helpful' : 1}})
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(500).json(err));
});

router.patch('/downvote/:reviewId', checkAuth, (req, res, next) => {
  const id = req.params.reviewId;
  Reviews.findOneAndUpdate(
    {_id :id}, 
    {$inc : {'unhelpful' : 1}})
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(500).json(err));
});

router.delete('/:reviewId', checkAuth, (req, res, next) => {
  const id = req.params.reviewId;
  Reviews.remove({ _id: id })
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) =>
      res.status(500).json({
        error: err,
      }),
    );
});

module.exports = router;
