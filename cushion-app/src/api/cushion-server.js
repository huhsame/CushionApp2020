import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const CushionApi = axios.create({
  baseURL: 'http://178.128.79.153:3000'
});

CushionApi.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default CushionApi;
