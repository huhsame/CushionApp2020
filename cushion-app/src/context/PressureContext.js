import createDataContext from './createDataContext';
import CushionApi from '../api/cushion-server';

const port = 11356;

const duration_test = 10 * 1000; // for test
const DURATION = duration_test; // 10 * 1000
const CURRENT_MAX = 2500;
const CURRENT_MIN = 500;

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
    const pressure =
      ((CURRENT_MAX - CURRENT_MIN - value) / (CURRENT_MAX - CURRENT_MIN)) *
        (1 - 0.1) +
      0.2;

    return pressure < 0.15 ? 0 : pressure > 1 ? 1 : pressure;
  });

const startGetingLatestPressure = dispatch => async cushionId => {
  console.log('Started geting pressure');
  // console.log(SQRT_CURRENT_MIN, SQRT_CURRENT_MAX);

  const timer = setInterval(async () => {
    try {
      const response = await CushionApi.get('/latestPressure/' + cushionId);
      const { values } = response.data;

      const pressure = convertToPressure(values);
      // console.log(pressures);
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

const getIntegral = dispatch => async cushionId => {
  const response = await CushionApi.get('/integral/' + cushionId);
  const { start, end, sum } = response.data;
  // sum[start,end](current), 각 좌표들끼리 모두 합친값 에 비례한 값

  const hourIntegrals = sum.map(value => {
    const pressure =
      ((30000 - 10000 - value) / (30000 - 10000)) * (1 - 0.1) + 0.1;

    return pressure < 0 ? 0 : pressure > 1 ? 1 : pressure;
  });

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
