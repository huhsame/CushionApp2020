const mongoose = require('mongoose');
const PointSchema = require('./Point');

const cushionSchema = new mongoose.Schema({
  cushionId: Number,
  time: Date,
  points: [PointSchema]
});
mongoose.model('Cushion', cushionSchema);
