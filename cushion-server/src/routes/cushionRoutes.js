const express = require('express');
const mongoose = require('mongoose');

const Point = mongoose.model('Point');
const Cushion = mongoose.model('Cushion');

const router = express.Router();

// 걍 오브젝트에 좌표값 잡아주는거
setCoords = () => {
  const array = [];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      array.push({ x: i, y: j });
    }
  }
  return array;
};
const coords = setCoords();

// 각 점의 최신값을 모조리 찾아서 하나의 배열로 보냄
router.get('/currentPoints', async (req, res) => {
  try {
    const points = await Promise.all(
      coords.map(async coord => {
        const point = await Point.findOne({ coord })
          .sort({ _id: -1 })
          .limit(1);
        // console.log(point);
        return { point: point };
      })
    );

    console.log(points);
    res.send(points);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.get('/currentPressure/:cushionId', async (req, res) => {
  const id = req.params.cushionId;
  console.log('[get] currentPressure: ' + id);

  try {
    const cushion = await Cushion.findOne({ id })
      .sort({ _id: -1 })
      .limit(1);

    console.log(cushion);
    // { "_id" : ObjectId("5f4a1add9dc6e50ecfbf2f4f"), "id" : 1, "time" : ISODate("2020-08-29T09:07:41Z"), "p00" : 3389, "p01" : 3370, "p02" : 3263, "p03" : 3367, "p04" : 3371, "p05" : 3195, "p10" : 3523, "p11" : 3519, "p12" : 3392, "p13" : 3478, "p14" : 3459, "p15" : 3293, "p20" : 3469, "p21" : 3472, "p22" : 3333, "p23" : 3439, "p24" : 3440, "p25" : 3280, "p30" : 3393, "p31" : 3401, "p32" : 3243, "p33" : 3361, "p34" : 3395, "p35" : 3247, "p40" : 3315, "p41" : 3314, "p42" : 3102, "p43" : 3216, "p44" : 3219, "p45" : 3029, "p50" : 3162, "p51" : 3189, "p52" : 2961, "p53" : 3109, "p54" : 3103, "p55" : 2896, "__v" : 0 }

    // cushion 받은걸로 [] 만들어야지
    // [{},{}, ...] // 16개 점 이 담긴 배열
    const pressures = [];

    res.send(pressure);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// TODO: 쿠션에서 받은 데이터를 -> 파싱해서 -> 디비에 저장해야함

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
