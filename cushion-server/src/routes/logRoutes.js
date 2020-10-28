const express = require('express');
const mongoose = require('mongoose');

const ClientSchema = mongoose.model('Client');

const router = express.Router();

router.get('/logs', async (req, res) => {
  console.log('shit');
  try {
    console.log(req.body);
    const { historyNumber, cushionId } = req.body;

    const logs = await ClientSchema.find({ cushion: cushionId }).sort({
      _id: -1
    });

    console.log(logs);

    res.send(logs);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
