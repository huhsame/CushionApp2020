import createDataContext from './createDataContext';
import CushionApi from '../api/cushion-server';
import { navigate } from '../navigationRef';

const num = 20;

const LogReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };

    case 'logs':
      return { ...state, logs: action.payload };
    case 'earlierLogs':
      return { logs: action.payload, ...state };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const setRecentLogs = dispatch => async ({ client }) => {
  console.log('setRecentLogs');
  console.log(client);

  try {
    const response = await CushionApi.get(`/recentLogs/${client}`);
    const logs = response.data;
    console.log(logs);

    dispatch({
      type: 'logs',
      payload: logs
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong.'
    });
  }
};

const getEalierLogs = dispatch => async ({ idCM, current }) => {
  console.log('getEalierLogs');
  console.log(idCM);

  try {
    const response = await CushionApi.get('/getEalierLogs', {
      idCM,
      current,
      num
    });
    const earlierLogs = response.data;
    console.log(response.data);

    dispatch({
      type: 'earlierLogs',
      payload: earlierLogs
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong.'
    });
  }
};

export const { Provider, Context } = createDataContext(
  LogReducer,
  { setRecentLogs, getEalierLogs, clearErrorMessage },
  {
    logs: [],
    earlierLogs: [],
    errorMessage: ''
  }
);
