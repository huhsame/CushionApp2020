const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserSchema = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = new UserSchema({ email, password, name });
    await user.save();
    const id = user._id;
    const avatar = user.avatar;
    console.log(id); //
    const token = jwt.sign({ id }, 'MY_SECRET_KEY');
    res.send({ token, id, avatar });
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  const id = user._id;
  const name = user.name;
  const avatar = user.avatar;
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ id }, 'MY_SECRET_KEY');
    res.send({ token, name, id, avatar }); // 토큰 받으면 증명된거
  } catch (err) {
    return res.status(422).send({ error: 'Invalid email or password' });
  }
});

module.exports = router;
