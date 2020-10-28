const mongoose = require('mongoose');
require('./Cushion');
const CushionSchema = mongoose.model('Cushion');

const currentSchema = new mongoose.Schema({
  time: Date,
  values: [Number],
  cushion: Number
});
mongoose.model('Current', currentSchema);

// 쿠션모델 따로 커런트모델 따로 만들엇어야했군
// 쿠션은 하나고 커런트 값은 여러개니까 참조로

// currentSchema.pre('save', async function(next) {
//   const current = this;
//   const cushion = await CushionSchema.findOne({ number: current.number });
//   if (!cushion) {
//     cushion = new CushionSchema({ number: current.number });
//     await cushion.save();
//   }
//   current.cushion = cushion._id;
//   console.log(cushion);
//   next();
// });
