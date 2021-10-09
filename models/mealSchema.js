const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectId;

const mealSchema = new mongoose.Schema(
    {
      user_id: { type: String, required: true, unique: true },
      foods: [ObjectId]
    },
    {
      timestamps: true,
    },
  );
const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
