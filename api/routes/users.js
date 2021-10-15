const express = require('express');
const router = express.Router();
const User = require('../../models/userSchema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

//TRYING TO HASH THIS! Ok to send password plaintext via https.
// https://security.stackexchange.com/questions/110415/is-it-ok-to-send-plain-text-password-over-https
// router.post('/', (req, res, next) => {
//   //let storedHash = yield bcrypt.hash("user_password", 10, null);   // to get hash
//   //let pwd = yield bcrypt.hash(req.body.password, 10, null);
//   bcrypt.hash(req.body.password, 10, (err, hash) => {
//     if (err) {
//       return res.status(500).json({ error: err });
//     } else {
//       const user = new Users({
//         full_name: req.body.full_name,
//         username: req.body.username,
//         password: hash,
//       });
//       user
//         .save()
//         .then((doc) => {
//           res.status(201).json({
//             message: 'User created',
//             createdUser: doc,
//           });
//         })
//         .catch((err) => console.log(err));
//     }
//   });
// });

module.exports = router;
