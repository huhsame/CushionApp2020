// 파일명은 그 스테이트의 변수명으로 짓는다
// 스크린에서 옐프에 해당하는 코드만 따로 빼서 파일로 분리

import {useState, useEffect} from 'react';
import zomato from '../api/zomato';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    try {
      /*
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          //   term,
          location: 'san jose'
        }
      });
      setResults(response.data.businesses);
      */

      console.log(searchTerm);
      const response = await zomato.get('/search', {
        params: {
          entity_id: 4,
          entity_type: 'city',
          q: searchTerm
        }
      });
      setResults(response.data.restaurants);
    } catch (err) {
      // 에러 핸들링
      console.log(err);
      setErrorMessage('Something went wrong');
    }
  };

  // 한번만, 원하는 떄에 콜한다.
  useEffect(() => {
    searchApi('pasta');
  }, []);

  // call search api when component is
  // is first rendered : BAD CODE !
  // searchApi('pasta');

  return [searchApi, results, errorMessage];
};
