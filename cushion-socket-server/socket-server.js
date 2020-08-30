require('./models/Point');
require('./models/Cushion');

const net = require('net');
const mongoose = require('mongoose');
const Cushion = mongoose.model('Cushion');

const port = 11356;

const user_id = 'kist';
const user_pw = 'kistWRLimrc';
const db_name = 'kist';

const mongoUri =
  'mongodb://' + user_id + ':' + user_pw + '@' + 'localhost:27017/' + db_name;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const server = net.createServer(function(socket) {
  socket.on('data', data => {
    let stringLine = String(data);
    let splitLines = stringLine.split(',');
    let unixTime = Number(splitLines[0]);

    let cushionTime = new Date(unixTime * 1000);
    let cushionId = Number(splitLines[1]);

    let currents = [];
    for (let i = 2; i < 37; i++) {
      currents.push(Number(splitLines[i]));
    }
    let v37 = splitLines[37].replace('\u0000', '');
    currents.push(Number(v37));

    const points = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        points.push({
          coord: { x: i, y: j },
          current: currents[i * 6 + j]
        });
      }
    }

    const cushion = new Cushion({
      cushioId: cushionId,
      time: cushionTime,
      points: points
    });

    cushion.save(function(error, data) {
      if (error) {
        console.log(error);
      } else {
        // console.log('Data Saved..');
      }
    });
  });
});

server.maxConnections = 10;

server.on('error', function(err) {
  console.log('err' + err);
});

server.listen(port, function() {
  console.log('listening on ' + port);
});

mongoose.connection.on('connected', () => {
  console.log('connected to Mongo instance');
});

mongoose.connection.on('err', err => {
  console.log('err connecting to Mongo instance', err);
});
