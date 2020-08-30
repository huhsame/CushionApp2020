const express = require('express');
const mongoose = require('mongoose');

const Point = mongoose.model('Point');
const Cushion = mongoose.model('Cushion');

const router = express.Router();

// 랜덤 생성 함수
const getPoints = () => {
  const array = [];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const pressure = Math.random() * (7000 - 100) + 100;
      array.push({ coord: { x: i, y: j }, pressure });
    }
  }
  // console.log(array);
  return array;
};

router.get('/currentPressure/:cushionId', async (req, res) => {
  const cushionId = req.params.cushionId;

  try {
    // find로 찾으면 배열로 받고 findOne으로 부르면 딱 그 항목만.
    const cushion = await Cushion.findOne({ cushionId }).sort({ _id: -1 });

    res.send(cushion.points);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// 랜덤으로 생성
router.put('/cushion', async (req, res) => {
  const points = getPoints();
  try {
    const cushion = new Cushion({
      id: 1,
      time: new Date(),
      points: points
    });
    await cushion.save();
    console.log(cushion);
    res.send({ 'suceess': true });
  } catch (err) {
    res.send({ error: err.message });
  }
});

// 점 하나 씩 디비에 저장
router.post('/point', async (req, res) => {
  const {
    point: { pressure, coord }
  } = req.body;

  try {
    const p = new Point({ pressure, coord });
    await p.save();
    // console.log(p);
    res.send({ 'suceess': true });
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = router;
