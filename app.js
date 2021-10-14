const express = require('express');
const cors = require('cors');
const restaurantRoutes = require('./api/routes/restaurants');
const reviewsRoutes = require('./api/routes/reviews');
const mealsRoutes = require('./api/routes/meals');
const foodsRoutes = require('./api/routes/foods');
const usersRoutes = require('./api/routes/users');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/restaurants', restaurantRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/meals', mealsRoutes);
app.use('/foods', foodsRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
