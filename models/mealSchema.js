const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    restaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
  },
  {
    timestamps: true,
  },
)
const Meal = mongoose.model('Meal', mealSchema)

module.exports = Meal
