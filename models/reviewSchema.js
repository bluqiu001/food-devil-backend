const mongoose = require('mongoose');

//Need to create user, restaurant id ref
const reviewSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    restaurant_id: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number, min: 0, max: 5, required: true },
    is_anonymous: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
