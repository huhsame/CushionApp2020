import createDataContext from './createDataContext';
import CushionApi from '../api/cushion-server';
import { navigate } from '../navigationRef';

const ClientReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'create':
      return {
        errorMessage: ''
      };
    case 'list':
      return { ...state, list: action.payload };

    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const createClient = dispatch => async ({
  cushion,
  matt,
  name,
  avatarUrl,
  age,
  sex
}) => {
  try {
    console.log(cushion);
    const response = await CushionApi.post('/createClient', {
      cushion,
      matt,
      name,
      avatarUrl,
      age,
      sex
    });
    dispatch({
      type: 'create'
    });
    navigate('ClientList');
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong.'
    });
  }
};

const getClientList = dispatch => async () => {
  // console.log(cushionId);

  try {
    const response = await CushionApi.get('/clientList');

    const clientList = response.data;
    // { _id, cushion,matt, name, avatarUrl, age, sex }

    dispatch({
      type: 'list',
      payload: clientList
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong.'
    });
  }
};

const getClient = dispatch => async ({ _id }) => {
  console.log(_id);

  try {
    const response = await CushionApi.get(`/client/${_id}`);

    const client = response.data;

    // { _id, cushion, matt, name, avatarUrl, age, sex }

    return client;

    // dispatch({
    //   type: 'client',
    //   payload: client
    // });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong.'
    });
  }
};

export const { Provider, Context } = createDataContext(
  ClientReducer,
  { createClient, getClientList, getClient, clearErrorMessage },
  {
    list: [],
    errorMessage: ''
  }
);
