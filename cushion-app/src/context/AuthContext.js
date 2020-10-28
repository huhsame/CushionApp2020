import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import CushionApi from '../api/cushion-server';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin': // sign up 도 이쪽으로 넘어옴.
      return {
        errorMessage: '',
        token: action.payload.token,
        name: action.payload.name,
        id: action.payload.id,
        avatar: action.payload.avatar
      };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, name: null, id: null, errorMessage: '' };

    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  const name = await AsyncStorage.getItem('name');
  const id = await AsyncStorage.getItem('id');
  if (token) {
    dispatch({ type: 'signin', payload: { token, name, id } });
    navigate('ClientList');
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

// 괄호 없애고 바로 리턴값을 적어
const signup = dispatch => async ({ email, password, name }, callback) => {
  try {
    const response = await CushionApi.post('/signup', {
      email,
      password,
      name
    });
    const token = response.data.token;
    const id = response.data.id;
    const avatar = response.data.avatar;

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('id', id);

    dispatch({ type: 'signin', payload: { id, token, name, avatar } });
    // navigate to main follow
    navigate('mainFlow');
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await CushionApi.post('/signin', {
      email,
      password
    });

    const token = response.data.token;
    const name = response.data.name;
    const id = response.data.id;
    const avatar = response.data.avatar;

    console.log('?');

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('id', id);

    dispatch({ type: 'signin', payload: { id, token, name, avatar } });

    // await AsyncStorage.setItem('token', token);
    navigate('ClientList');
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: err
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('name');
  await AsyncStorage.removeItem('id');

  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  {
    id: '',
    token: null,
    name: '',
    errorMessage: '',
    avatar: ''
  }
);
