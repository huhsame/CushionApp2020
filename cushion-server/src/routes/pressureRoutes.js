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
const HOUR = 60 * 1000 * 60; //

router.get('/integral/:idCM', async (req, res) => {
  const idCM = req.params.idCM;
  console.log('idCM: ' + idCM);

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
      idCM,
      time: { $gt: start, $lt: end }
    })
      .select('values')
      .sort({ _id: -1 });
    // .limit(10);

    const zeroArray =
      idCM > 1000 ? new Array(435).fill(0) : new Array(36).fill(0);
    // zeroArray.fill(0);

    // 각 좌표끼리의 합
    let sum = Currents.reduce((acc, current) => {
      current.values.map((value, index) => {
        acc[index] += Math.round(value / 100); // overflow 방지
      });
      return acc;
    }, zeroArray);

    console.log(JSON.stringify(sum));
    // console.log(idCM + ': ' + sum.length);
    res.send({ start, end, sum });
  } catch (err) {
    let sum = 0;
    if (idCM > 1000) {
      sum = new Array(435).fill(1500);
    } else {
      sum = new Array(36).fill(1500);
    }

    console.log(idCM + ': ' + sum.length);
    res.send({ start, end, sum });
  }
});

router.get('/latestPressure/:idCM', async (req, res) => {
  const idCM = req.params.idCM;
  console.log(idCM);

  try {
    // find로 찾으면 배열로 받고 findOne으로 부르면 딱 그 항목만.
    const { values } = await CurrentSchema.findOne({ idCM }).sort({
      _id: -1
    });

    res.send({ values });
  } catch (err) {
    const values =
      idCM > 1000 ? new Array(435).fill(1500) : new Array(36).fill(1500);
    res.send({ values });

    //   console.log(err);
    //   res.send({ error: err.message });
  }
});

module.exports = router;
