const mongoose = require('mongoose');
require('./Log');
require('./Cushion');
const CushionSchema = mongoose.model('Cushion');
const LogSchema = mongoose.model('Log');

const clientSchema = new mongoose.Schema({
  cushion: Number,
  name: {
    type: String,
    equired: true,
    default: ''
  },
  avatarUrl: {
    type: String,
    default: 'https://placeimg.com/128/128/any'
  },
  age: Number,
  sex: {
    type: Boolean,
    default: true // 0: Male, 1: Female
  },
  log: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: LogSchema
    }
  ]
});

mongoose.model('Client', clientSchema);
