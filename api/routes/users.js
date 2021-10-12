const express = require('express');
const router = express.Router();
const Users = require('../../models/userSchema');
const bcrypt = require('bcrypt');


//to change
router.get('/', (req, res) => {
  Reviews.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//to change
router.get('/:reviewId', (req, res) => {
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

//TRYING TO HASH THIS! Ok to send password plaintext via https. 
// https://security.stackexchange.com/questions/110415/is-it-ok-to-send-plain-text-password-over-https
router.post('/', (req, res, next) => {
  //let storedHash = yield bcrypt.hash("user_password", 10, null);   // to get hash
  //let pwd = yield bcrypt.hash(req.body.password, 10, null);
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new Users({
        full_name: req.body.full_name,
        username: req.body.username,
        password: hash,
      });
      user
      .save()
      .then((doc) => {
        res.status(201).json({
          message: 'User created',
          createdUser: doc,
        });
      })
      .catch((err) => console.log(err));
    }
    
  });
});

//to change
router.patch('/:reviewId', (req, res, next) => {
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

//to change
router.delete('/:reviewId', (req, res, next) => {
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
