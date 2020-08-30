const mongoose = require('mongoose');
const LogSchema = require('./Log');

const cushionUserSchema = new mongoose.Schema({
  cushionId: {
    type: Number,
    required: true
  },
  cushionUserId: {
    type: String,
    unique: true,
    required: true
  },
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
  log: [LogSchema]
});

mongoose.model('CushionUser', cushionUserSchema);
