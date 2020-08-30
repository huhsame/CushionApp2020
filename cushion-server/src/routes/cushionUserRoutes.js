const express = require('express');
const mongoose = require('mongoose');

const Point = mongoose.model('Point');
const Cushion = mongoose.model('Cushion');
const CushionUser = mongoose.model('CushionUser');

const router = express.Router();

module.exports = router;
