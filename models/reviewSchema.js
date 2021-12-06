const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reviewSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    restaurant_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Restaurant'
    },
    description: { type: String, required: true },
    stars: { type: Number, min: 0, max: 5, required: true },
    is_anonymous: { type: Boolean, required: true },
    helpful: { type: Number, type: Number, default: 0 },
    unhelpful: { type: Number, type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
)

reviewSchema.index({ user_id: 1, restaurant_id: 1 }, { unique: true })

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
