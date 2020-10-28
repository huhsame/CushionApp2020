const express = require('express');
const mongoose = require('mongoose');

require('../models/Current');
require('../models/Cushion');
require('../models/User');
require('../models/Client');
require('../models/Log');

const CushionSchema = mongoose.model('Cushion');
const LogSchema = mongoose.model('Log');
const CurrentSchema = mongoose.model('Current');
const UserSchema = mongoose.model('User');
const ClientSchema = mongoose.model('Client');

const router = express.Router();

const DATA_INTERNAL = 500;
const INTEVAL_INTEGRATION = 10 * 60 * 1000;
const HOUR = 60 * 60 * 1000;

router.get('/integral/:cushionId', async (req, res) => {
  const cushionId = req.params.cushionId;

  const now = new Date();
  let HoursAgo = new Date();
  let MinutesAgo = new Date();
  HoursAgo.setHours(now.getHours() - 1);
  MinutesAgo.setMinutes(now.getMinutes() - 5);

  // console.log(now.toLocaleString());
  // console.log(anHourAgo.toLocaleString());
  const start = MinutesAgo;
  const end = now;

  try {
    // find로 찾으면 배열로 받고 findOne으로 부르면 딱 그 항목만.
    const limit = Math.round(HOUR / DATA_INTERNAL);
    const Currents = await CurrentSchema.find({
      cushion: cushionId,
      time: { $gt: start, $lt: end }
    })
      .select('values')
      .sort({ _id: -1 });
    // .limit(10);

    const zeroArray = new Array(36);
    zeroArray.fill(0);

    // 각 좌표끼리의 합
    let sum = Currents.reduce((acc, current) => {
      current.values.map((value, index) => {
        acc[index] += Math.round(value / 100); // overflow 방지
      });
      return acc;
    }, zeroArray);

    // console.log(JSON.stringify(points));

    res.send({ start, end, sum });
  } catch (err) {
    console.log(err);
  }
});

router.get('/latestPressure/:cushionId', async (req, res) => {
  const cushionId = req.params.cushionId;

  try {
    // find로 찾으면 배열로 받고 findOne으로 부르면 딱 그 항목만.
    const { values } = await CurrentSchema.findOne({ cushion: cushionId }).sort(
      {
        _id: -1
      }
    );
    res.send({ values });
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = router;
