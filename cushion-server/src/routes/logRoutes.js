const express = require('express');
const mongoose = require('mongoose');

const ClientSchema = mongoose.model('Client');
const LogSchema = mongoose.model('Log');

const router = express.Router();

router.get('/recentLogs/:client', async (req, res) => {
  console.log('get logs');
  const client = req.params.client;
  console.log('client: ' + client);

  try {
    // console.log(req.body);
    // const { num, client } = req.body;

    const logs = await LogSchema.find()
      .sort({
        _id: -1
      })
      .limit(20);

    res.send(logs.reverse());
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.get('/earlierLogs', async (req, res) => {
  console.log('get earlierLogs');
  try {
    console.log(req.body);
    const { idCM, current, num } = req.body;

    const earlierLogs = await ClientSchema.find({ idCM, _id: { $lt: current } })
      .sort({
        _id: -1
      })
      .limit(num);

    console.log(earlierLogs);

    res.send(earlierLogs);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
