require('./models/User'); // 어사인 할 필요 없다.
require('./models/Point');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoutes');
const pointRoute = require('./routes/pointRoutes');

const requireAuth = require('./middlewares/requireAuth');

const app = express();

// 순서 잘 지켜야해
app.use(bodyParser.json());
app.use(authRoute);
app.use(pointRoute);

var user_id = 'kist';
var user_pw = 'kistWRLimrc';
var db_name = 'kist';

const mongoUri =
  'mongodb://' + user_id + ':' + user_pw + '@' + 'localhost:27017/' + db_name;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('connected to Mongo instance');
});

mongoose.connection.on('err', err => {
  console.log('err connecting to Mongo instance', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
// node src/index.js 로 서버 실행 가능
