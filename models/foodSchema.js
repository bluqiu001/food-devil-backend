const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodSchema = new mongoose.Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Restaurant',
  },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  allergens: [String],
  serving_size: { type: String, required: true },
  total_cal: { type: Number, required: true, min: 0 },
  fat: { type: Number, min: 0 },
  carbs: { type: Number, min: 0 },
  sugars: { type: Number, min: 0 },
  protein: { type: Number, min: 0 },
  vitaminA: { type: Number, min: 0, max: 100 },
  vitaminC: { type: Number, min: 0, max: 100 },
  calcium: { type: Number, min: 0, max: 100 },
  iron: { type: Number, min: 0, max: 100 },
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food
