const mongoose = require('mongoose');
const PointSchema = require('./Point');

const cushionSchema = new mongoose.Schema({
  id: Number,
  time: Date,
  points: [PointSchema]
});
mongoose.model('Cushion', cushionSchema);
