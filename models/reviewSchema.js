const mongoose = require('mongoose');

//Need to create user, restaurant id ref
const reviewSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    restaurant_id: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number, min: 0, max: 5, required: true },
    is_anonymous: { type: Boolean, required: true },
    helpful: { type: Number, type: Number, default: 0},
    unhelpful: { type: Number, type: Number, default: 0}
  },
  {
    timestamps: true,
  },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
