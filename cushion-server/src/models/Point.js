const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  // id: {
  //   type: mongoose.Schema.Types.ObjectId
  // },

  coord: {
    x: Number, // 0~5
    y: Number // 0~5
  },
  // timestamp: Number, // ? Date?
  pressure: Number
});
mongoose.model('Point', pointSchema);
