const express = require('express');
const router = express.Router();
const User = require('../../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: 'User already exists!' });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              full_name: req.body.full_name,
              username: req.body.username,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: 'User created',
                });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          }
        });
      }
    });
});

router.post('/login', (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id,
            },
            keys.jwt_key,
            { expiresIn: '7d' },
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token,
          });
        }
        return res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete('/:userId', (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'User deleted successfully!',
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//Get a userid associated with a username
router.get('/username/:username', (req, res) => {
  const id = req.params.username;
  User.findOne({ username: req.params.username })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc._id);
      } else {
        res
          .status(404)
          .json({ message: 'No userid found for provided username' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Get a user associated with a userid
router.get('/userid/:userid', (req, res) => {
  const id = req.params.userid;
  User.findOne({ _id: id})
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: 'No user found for provided userid' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Get all users
router.get('/', (req, res) => {
  User.find({}, '_id username')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: 'No user found for provided username' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
