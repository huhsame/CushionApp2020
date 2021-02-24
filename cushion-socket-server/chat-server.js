require('./models/Current');
require('./models/Cushion');
require('./models/User');
require('./models/Client');
require('./models/Log');

const mongoose = require('mongoose');

const CushionSchema = mongoose.model('Cushion');
const LogSchema = mongoose.model('Log');
const CurrentSchema = mongoose.model('Current');
const UserSchema = mongoose.model('User');
const ClientSchema = mongoose.model('Client');

const io = require('socket.io')(); // 뒤에 (); 해줘야 인스턴스 생성

const messageHandler = require('./handlers/message.handler');

const port = 11333;

const db_user_id = 'kist';
const db_user_pw = 'kistWRLimrc';
const db_name = 'kist';

const mongoUri =
  'mongodb://' +
  db_user_id +
  ':' +
  db_user_pw +
  '@' +
  'localhost:27017/' +
  db_name;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const users = []; // 디비에서 불러와야하는데, 소켓 접속중인 유저는 ?

const createUserAvatarUrl = () => {
  const rand1 = Math.round(Math.random() * 200 + 100); // 100 ~300
  const rand2 = Math.round(Math.random() * 200 + 100);

  return `https://placeimg.com/${rand1}/${rand2}/any`;
};

io.on('connection', socket => {
  console.log('a user connected: ' + socket.id);
  // console.log(socket);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('enter', ({ client, userId }) => {
    console.log('userId: ' + userId);

    socket.join(client, () => {
      console.log('환자 _id: ' + client);
      // console.log(user);
    });
  });

  messageHandler.handleMessage(socket, users); // 이 안에 소켓 이벤트 포함되어잇다.
});

io.listen(port, console.log('listening on ' + port));

mongoose.connection.on('connected', () => {
  console.log('connected to Mongo instance');
});

mongoose.connection.on('err', err => {
  console.log('err connecting to Mongo instance', err);
});
