const express = require('express');
const mongoose = require('mongoose');

const ClientSchema = mongoose.model('Client');

const router = express.Router();

router.post('/createClient', async (req, res) => {
  const { cushion, name, avatarUrl, age, sex } = req.body;

  try {
    const client = new ClientSchema({
      cushion,
      name,
      avatarUrl,
      age,
      sex
    });

    await client.save();

    res.send({ success: true });
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.get('/clientList', async (req, res) => {
  try {
    const list = await ClientSchema.find();
    // console.log(list);

    const clientList = list.map(
      ({ _id, cushion, name, avatarUrl, age, sex }) => {
        return {
          id: _id,
          cushion,
          name,
          avatarUrl,
          age,
          sex
        };
      }
    );

    res.send(clientList);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
