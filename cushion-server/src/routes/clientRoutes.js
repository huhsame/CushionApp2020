const express = require('express');
const mongoose = require('mongoose');

const ClientSchema = mongoose.model('Client');

const router = express.Router();

router.post('/createClient', async (req, res) => {
  const { cushion, matt, name, avatarUrl, age, sex } = req.body;

  try {
    const client = new ClientSchema({
      cushion,
      matt,
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
      ({ _id, cushion, matt, name, avatarUrl, age, sex }) => {
        return {
          _id,
          matt,
          cushion,
          matt,
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

router.get('/client/:_id', async (req, res) => {
  const _id = req.params._id;

  try {
    const client = await ClientSchema.findOne({ _id });

    console.log(client);

    // const clientList = list.map(
    //   ({ _id, cushion, matt, name, avatarUrl, age, sex }) => {
    //     return {
    //       _id,
    //       matt,
    //       cushion,
    //       matt,
    //       name,
    //       avatarUrl,
    //       age,
    //       sex
    //     };
    //   }
    // );

    res.send(client);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
