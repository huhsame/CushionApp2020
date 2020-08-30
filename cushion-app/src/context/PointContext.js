import createDataContext from './createDataContext';
import CushionApi from '../api/cushion-server';

const PRESSURE_MAX = 7000;
const PRESSURE_MIN = 200;

const pointReducer = (state, action) => {
  switch (action.type) {
    case 'get_current_Pressure':
      return { ...state, points: action.payload };

    case 'add_error':
      return { ...state, errorMessage: '' };
    case 'post_point':
      return { ...state, setPoint: action.payload };

    default:
      return state;
  }
};

const getCurrentPoints = dispatch => async () => {
  try {
    const response = await CushionApi.get('/currentPoints');
    // response = [{},{}, ...] // 16개 점 이 담긴 배열
    const points = [];
    response.data.map(({ point: { pressure, coord } }) => {
      points.push({ pressure, coord });
    });

    dispatch({ type: 'get_current_points', payload: points });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'post_error',
      payload: err
    });
  }
};

const getCurrentPressure = dispatch => async () => {
  try {
    const response = await CushionApi.get('/currentPressure/1');

    // response = [{},{}, ...] // 16개 점 이 담긴 배열
    const points = [];
    response.data.map(({ pressure, coord }) => {
      pressure = pressure > PRESSURE_MAX ? PRESSURE_MAX : pressure;
      pressure = pressure < PRESSURE_MIN ? PRESSURE_MIN : pressure;

      const ratio =
        (pressure / (PRESSURE_MAX - PRESSURE_MIN)) * (1 - 0.1) + 0.1;

      points.push({ pressure: ratio, coord });
    });

    dispatch({ type: 'get_current_Pressure', payload: points });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'post_error',
      payload: err
    });
  }
};

// 그냥 여기 내부에서 쓰이는 함수. 이거를 훅에다가 넣는건가 ?
const setCoords = () => {
  const array = [];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const pressure = Math.random() * (1 - 0.1) + 0.1;
      array.push({ coord: { x: i, y: j }, pressure });
    }
  }
  // console.log(array);
  return array;
};

// 16개를 세이브
const postPoints = dispatch => () => {
  const points = setCoords();
  points.map(async point => {
    try {
      const respond = await CushionApi.post('/point', { point });
      // dispatch({ type: 'post_point', payload: respond.data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'add_error',
        payload: err
      });
    }
  });
};

// provider는 app.js 파일에서 쓰인다.
export const { Provider, Context } = createDataContext(
  pointReducer,
  { getCurrentPoints, postPoints, getCurrentPressure },
  { points: [], errorMessage: '' }
);

// id, timestamp, pressure
