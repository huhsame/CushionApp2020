import createDataContext from './createDataContext';
import CushionApi from '../api/cushion-server';
import { navigate } from '../navigationRef';

const historyNumber = 20;

const LogReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };

    case 'logs':
      return { ...state, logs: action.payload };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const getLogs = dispatch => async cushionId => {
  console.log('getLogs');
  console.log(cushionId);

  try {
    const response = await CushionApi.get('/logs', {
      cushionId,
      historyNumber
    });
    const logs = response.data;

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

export const { Provider, Context } = createDataContext(
  LogReducer,
  { getLogs, clearErrorMessage },
  {
    logs: [],
    errorMessage: ''
  }
);
