import React from 'react';
// import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client';

const socket = io('https://178.128.79.153:11333');

function App() {
  socket.on('broadcast', data => {
    console.log(data);
  });

  return <div className='App'></div>;
}

export default App;
