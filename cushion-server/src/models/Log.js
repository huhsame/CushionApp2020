const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  updated: { type: Date, default: Date.now },
  by: { type: String, default: 'System' }, // or user
  content: { type: String, default: 'is fine', required: true }
});
mongoose.model('Log', logSchema);

module.exports = logSchema;
