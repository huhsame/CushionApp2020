import createDataContext from './createDataContext';
import CushionApi from '../api/cushion-server';

const CURRENT_MAX = 3000;
const CURRENT_MIN = 500;

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

const getCurrentPressure = dispatch => async cushionId => {
  try {
    // console.log(cushionId);
    const response = await CushionApi.get('/currentPressure/' + cushionId);
    console.log(response.data);
    // response = [{},{}, ...] // 16개 점 이 담긴 배열
    const points = [];
    response.data.map(({ current, coord }) => {
      current = current > CURRENT_MAX ? CURRENT_MAX : current;
      current = current < CURRENT_MIN ? CURRENT_MIN : current;

      const pressure =
        ((CURRENT_MAX - CURRENT_MIN - current) / (CURRENT_MAX - CURRENT_MIN)) *
          (1 - 0.1) +
        0.1;

      points.push({ pressure, coord });
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
  { getCurrentPressure },
  { points: [], errorMessage: '' }
);

// id, timestamp, pressure
