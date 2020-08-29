const express = require('express');
const mongoose = require('mongoose');

const Point = mongoose.model('Point');

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

// TODO: 쿠션에서 받은 데이터를 -> 파싱해서 -> 디비에 저장해야함

// 랜덤 생성 함수
// const setCoords = () => {
//   const array = [];
//   for (let i = 0; i < 6; i++) {
//     for (let j = 0; j < 6; j++) {
//       const pressure = Math.random() * (1 - 0.1) + 0.1;
//       array.push({ coord: { x: i, y: j }, pressure });
//     }
//   }
//   // console.log(array);
//   return array;
// };

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
