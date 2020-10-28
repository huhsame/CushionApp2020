const mongoose = require('mongoose');
require('./Cushion');
const CushionSchema = mongoose.model('Cushion');

const beaconSchema = new mongoose.Schema({
  time: Date, // time stamp
  values: [Number], // beacon data array
  cushion: Number // cushion id
});
mongoose.model('Current', beaconSchema);
