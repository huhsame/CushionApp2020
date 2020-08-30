const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  coord: {
    x: Number, // 0~5
    y: Number // 0~5
  },
  current: {
    // current 였군.. ㅋㅋㅋㅋㅋㅋ  500 ~ 3000
    type: Number,
    default: 0
  }
});
mongoose.model('Point', pointSchema);

module.exports = pointSchema;
