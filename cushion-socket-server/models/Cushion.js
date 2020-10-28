const mongoose = require('mongoose');
require('./User');

const UserSchema = mongoose.model('User');

const cushionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserSchema
  },
  number: { type: Number, default: 0 }
});
mongoose.model('Cushion', cushionSchema);

// 쿠션모델 따로 커런트모델 따로 만들엇어야했군
// 쿠션은 하나고 커런트 값은 여러개니까 참조로
