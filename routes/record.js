const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
// GET ALL REVIEWS
recordRoutes.route("/review").get(function (req, res) {
  let db_connect = dbo.getDb("Food-Devil");
  db_connect
    .collection("reviews")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
// (CURRENTLY UNUSED)
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
// CREATE REVIEW
recordRoutes.route("/review").post(function (req, response) {
  let db_connect = dbo.getDb("myFirstDatabase");
  let myobj = {
    user_id: req.body.user_id,
    restaurant_id: req.body.restaurant_id,
    description: req.body.description,
    stars: req.body.stars,
    is_anonymous: req.body.is_anonymous
  };
  /*let myobj = {
    user_id: req.query.user_id,
    restaurant_id: req.query.restaurant_id,
    description: req.query.description,
    stars: req.query.stars,
    is_anonymous: req.query.is_anonymous
  };*/

  db_connect.collection("reviews").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
// UPDATE REVIEW
recordRoutes.route("/review/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      description: req.body.description,
      stars: req.body.stars,
      is_anonymous: req.body.is_anonymous,
    },
  };
  db_connect
    .collection("reviews")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
// DELETE REVIEW
recordRoutes.route("/review/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("reviews").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = recordRoutes;