require('./User');
require('./Cushion');

const mongoose = require('mongoose');
const UserSchema = mongoose.model('User');
const CushionSchema = mongoose.model('Cushion');

// 디비에 저장되는 로그스키마

// 그냥 그 채팅에 되는 스키마 그대로 저장시키고,
// 그대로 히스토리 불러오는걸로 하자 으이구 !
const logSchema = new mongoose.Schema({
  text: { type: String, default: 'is fine' },
  createdAt: { type: Date, default: Date.now },

  alert: { type: Boolean, default: false },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: UserSchema
  // },
  // 레퍼 안달고 그냥 바로 때려 넣어버려
  user: {
    _id: String,
    name: String,
    avatar: String
  },
  client: {
    type: String
  }
});
mongoose.model('Log', logSchema);

module.exports = logSchema;

// 소켓으로 전달되는 messageData

// {
//   _id: 1,
//   text: 'Hello developer',
//   createdAt: new Date(),
//   user: {
//     _id: 2,
//     name: 'React Native',
//     avatar: 'https://placeimg.com/140/140/any',
//   },
// }
