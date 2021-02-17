import createDataContext from './createDataContext';
import CushionApi from '../api/cushion-server';

const port = 11356;

const duration_test = 300 * 1000; // for test
const DURATION = duration_test; // 10 * 1000
const CURRENT_MAX = 1250; // 스판천 2000, 안스판천 1250, 테이프
const CURRENT_MIN = 500;
const CUSHION_NUM = 36;
const MATT_NUM = 435;

// +5 = 50
// +10 = 100

// +30 = 10

/*
 * ######### data -> graph
 */
const SQRT_CURRENT_MAX = Math.sqrt(CURRENT_MAX);
const SQRT_CURRENT_MIN = Math.sqrt(CURRENT_MIN);

const POW_CURRENT_MAX = Math.pow(CURRENT_MAX);
const POW_CURRENT_MIN = Math.pow(CURRENT_MIN);

/*
 * ######### data -> graph
 */

const pressureReducer = (state, action) => {
  switch (action.type) {
    case 'get_latest_pressure':
      return { ...state, pressures: action.payload };
    case 'get_integral':
      return {
        ...state,
        hourIntegrals: action.payload.hourIntegrals,
        start: action.payload.start,
        end: action.payload.end
      };

    case 'add_error':
      return { ...state, errorMessage: '' };
    case 'post_point':
      return { ...state, setPressure: action.payload };

    default:
      return state;
  }
};

const convertToPressure = values =>
  values.map(value => {
    value > CURRENT_MAX
      ? (value = CURRENT_MAX)
      : value < CURRENT_MIN
      ? (value = CURRENT_MIN)
      : value;
    // console.log(value);
    const pressure = (CURRENT_MAX - value) / (CURRENT_MAX - CURRENT_MIN);

    return pressure < 0.15 ? 0 : pressure > 1 ? 1 : pressure;
  });

const startGetingLatestPressure = dispatch => async idCM => {
  console.log('Started geting pressure');
  // console.log(idCM);
  // console.log(SQRT_CURRENT_MIN, SQRT_CURRENT_MAX);

  const timer = setInterval(async () => {
    try {
      // console.log('fuck');
      const response = await CushionApi.get('/latestPressure/' + idCM);
      const { values } = response.data;
      // console.log(values);

      const pressure = convertToPressure(values);
      console.log(pressure);
      dispatch({ type: 'get_latest_pressure', payload: pressure });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'post_error',
        payload: err
      });
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    console.log('Finised geting pressure');
  }, DURATION);
};

const getIntegral = dispatch => async idCM => {
  console.log(idCM);
  const response = await CushionApi.get('/integral/' + idCM);
  let { start, end, sum } = response.data;
  // sum[start,end](current), 각 좌표들끼리 모두 합친값 에 비례한 값
  if (sum.length === 0) {
    sum = idCM > 1000 ? new Array(435).fill(1500) : new Array(36).fill(1500);
    console.log(sum);
  }
  let num = idCM > 1000 ? MATT_NUM : CUSHION_NUM;
  console.log('getIntegral: ' + sum.length);
  const hourIntegrals = sum.map(value => {
    const pressure = ((5500 - value) / (5500 - 1500)) * 0.95;

    // const pressure =
    //   ((CURRENT_MAX * num - CURRENT_MIN * num - value) /
    //     (CURRENT_MAX * num - CURRENT_MIN * num)) *
    //   (1 - 0.1);

    return pressure < 0 ? 0 : pressure > 1 ? 1 : pressure;
  });

  // 11 12 13 14 15 16
  // 16-val = 0,
  console.log(hourIntegrals);
  dispatch({
    type: 'get_integral',
    payload: { hourIntegrals, start, end }
  });
};

// provider는 app.js 파일에서 쓰인다.
export const { Provider, Context } = createDataContext(
  pressureReducer,
  { startGetingLatestPressure, getIntegral },
  {
    pressures: [],
    hourIntegrals: [],
    start: Date.now(),
    end: Date.now(),
    errorMessage: ''
  }
);

// id, timestamp, pressure

/*
1] 테이프 + 2장

3312,3294,3453,3280,3236,3229,
3859,3849,3915,3861,3851,3845,
3050,3046,3269,3015,3042,3042,
3069,3067,3294,3147,3117,3089,
3088,3056,3248,3087,3038,2928,
3146,3126,3315,3187,3139,2983,
 
세게 누르면 600

647,625,633,635,633,655,
624,601,592,601,614,624,
624,597,593,598,606,626,
614,600,592,602,606,619,
610,594,590,599,607,611,
607,593,592,592,592,609

2] 스판 있는거 + 2장

3091,3136,2727,2645,2898,3043,
2994,3049,2454,2340,2697,2895,
2983,3066,2431,2386,2715,2930,
2924,3023,2332,2275,2559,2845,
3008,3108,2592,2390,2607,2875,
3152,3235,2858,2685,2833,3039



786,762,769,781,761,774,
661,668,658,658,655,663,
650,640,655,638,624,643,
645,649,641,633,610,634,
641,643,656,637,625,635,
667,671,670,656,643,656


3] 스판없는거 + 3장


id: 1001 length: 437
full_data :  1604311738,1001,1773,1737,1629,1607,1600,1601,1598,1695,1770,1789,1793,1815,1821,1901,1871,1746,1702,1586,1558,1559,1558,1554,1654,1727,1749,1755,1782,1782,1858,1839,1739,1694,1573,1535,1535,1535,1535,1637,1719,1733,1741,1761,1737,1908,1940,1692,1637,1535,1504,1489,1507,1424,1520,1665,1682,1652,1759,1758,1844,1790,1665,1818,1500,1431,1426,1414,1448,1522,1677,1679,1603,1676,1664,1755,1800,1653,1611,1499,1457,1445,1475,1459,1568,1645,1639,1680,1706,1725,1813,1792,1808,1755,1653,1626,1625,1619,1622,1712,1789,1801,1808,1829,1833,1931,1895,1676,1613,1476,1444,1441,1438,1445,1535,1648,1654,1668,1701,1714,1818,1797,1641,1577,1423,1390,1384,1388,1391,1497,1601,1616,1629,1665,1679,1789,1769,1613,1535,1385,1346,1344,1343,1344,1458,1570,1585,1601,1639,1659,1769,1750,1630,1568,1408,1362,1365,1365,1362,1473,1591,1612,1616,1659,1667,1779,1767,1655,1597,1435,1401,1402,1399,1399,1516,1622,1639,1653,1680,1685,1795,1790,1730,1680,1535,1507,1505,1499,1507,1616,1703,1715,1728,1757,1773,1871,1855,1666,1602,1450,1407,1408,1403,1411,1520,1630,1639,1646,1679,1690,1799,1782,1819,1741,1611,1575,1581,1578,1578,1680,1766,1771,1774,1807,1815,1906,1894,1664,1622,1429,1387,1391,1295,1392,1521,1636,1648,1655,1694,1702,1811,1795,1663,1607,1424,1379,1377,1382,1404,1520,1634,1814,1680,1639,1744,1671,1808,1495,1415,1219,1153,1151,1151,1168,1330,1461,1535,1520,1584,1615,1770,1731,1136,1078,726,675,639,659,638,938,1168,1223,1185,1385,1383,1505,1488,1193,1062,750,662,656,655,656,934,1174,1225,1257,1325,1347,1504,1494,1168,1061,751,653,656,655,654,926,1175,1230,1251,1325,1353,1511,1493,1226,1118,831,742,743,737,752,1008,1232,1280,1305,1366,1391,1535,1526,1499,1419,1226,1170,1171,1174,1179,1356,1514,1527,1552,1602,1616,1757,1731,1532,1461,1298,1258,1254,1251,1255,1412,1559,1578,1588,1646,1651,1777,1759,1616,1535,1408,1375,1372,1374,1376,1519,1635,1658,1671,1719,1730,1842,1820,1529,1458,1328,1300,1298,1302,1303,1451,1584,1609,1614,1661,1680,1798,1777,1535,1481,1371,1344,1344,1344,1344,1486,1610,1629,1646,1689,1701,1839,1808,1466,1408,1294,1270,1265,1264,1265,1420,1553,1577,1594,1647,1658,178

*/
