require('./models/Current');

const net = require('net');
require('./models/Current');
require('./models/Cushion');
require('./models/User');
require('./models/Client');
require('./models/Log');
require('./models/Beacon');

const mongoose = require('mongoose');
const CushionSchema = mongoose.model('Cushion');
const LogSchema = mongoose.model('Log');
const CurrentSchema = mongoose.model('Current');
const UserSchema = mongoose.model('User');
const ClientSchema = mongoose.model('Client');
const BeaconSchema = mongoose.model('Beacon');

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
    let cushionNumber = Number(splitLines[1]);

    let values = [];
    for (let i = 2; i < 37; i++) {
      values.push(Number(splitLines[i]));
    }
    let v37 = splitLines[37].replace('\u0000', '');
    values.push(Number(v37));

    if(splitLines.length>38){      // Start Beacon - If only when the data has more than 36 current data. (If it's new version of cushion that has Beacon detector)
        // console.log("With BLE");
	let beaconValues = [];
	for(let i=38; i<42; i++){
		beaconValues.push(Number(splitLines[i]));
	}
	beaconValues.push(Number(splitLines[42].replace("\u0000","")));
       
	const beacon = new BeaconSchema({
            cushion: cushionNumber,
            time: cushionTime,
            values: beaconValues
        });

	beacon.save(function(error, data) {
        if (error) {
            console.log(error);
        } else {
        console.log(data);
        }
      });
    }				// End Beacon

    const current = new CurrentSchema({
      cushion: cushionNumber,
      time: cushionTime,
      values
    });

    current.save(function(error, data) {
      if (error) {
        console.log(error);
      } else {
        // console.log(data);
	// console.log(cushionNumber+" "+cushionTime);
      }
    });
  });
});

server.maxConnections = 10;

server.on('error', function(err) {
  console.log('err' + err);
});

server.listen(port, async function() {
  console.log('listening on ' + port);
});

mongoose.connection.on('connected', () => {
  console.log('connected to Mongo instance');
});

mongoose.connection.on('err', err => {
  console.log('err connecting to Mongo instance', err);
});
