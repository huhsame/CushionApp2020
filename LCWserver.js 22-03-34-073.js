var mongoose = require('mongoose');
var net = require('net');
var port = 11356;

var db_name = 'kist';
var user_id = 'kist';
var user_pw = 'kistWRLimrc';

mongoose.connect(
  'mongodb://' + user_id + ':' + user_pw + '@' + 'localhost:27017/' + db_name,
  { useNewUrlParser: true }
);
var db = mongoose.connection;

db.on('error', function() {
  console.log('DB connection Failed!');
});
db.once('open', function() {
  console.log('DB Connected!, collection:' + db_name);
});

var cushion_schema = mongoose.Schema(
  {
    id: 'number',
    time: 'Date',
    p00: 'number',
    p01: 'number',
    p02: 'number',
    p03: 'number',
    p04: 'number',
    p05: 'number',
    p10: 'number',
    p11: 'number',
    p12: 'number',
    p13: 'number',
    p14: 'number',
    p15: 'number',
    p20: 'number',
    p21: 'number',
    p22: 'number',
    p23: 'number',
    p24: 'number',
    p25: 'number',
    p30: 'number',
    p31: 'number',
    p32: 'number',
    p33: 'number',
    p34: 'number',
    p35: 'number',
    p40: 'number',
    p41: 'number',
    p42: 'number',
    p43: 'number',
    p44: 'number',
    p45: 'number',
    p50: 'number',
    p51: 'number',
    p52: 'number',
    p53: 'number',
    p54: 'number',
    p55: 'number'
  },
  {
    collection: 'cushion'
  }
);
var cushion = mongoose.model('Schema', cushion_schema);

var server = net.createServer(function(socket) {
  //console.log(socket.address().address + " connected.");
  socket.on('data', function(data) {
    //console.log('\n'+data);
    var string_line = String(data);
    var split_line = string_line.split(',');
    var unix_time = Number(split_line[0]);

    var cushion_time = new Date(unix_time * 1000);
    var cushion_id = Number(split_line[1]);

    var pressure = [];
    for (var i = 2; i < 37; i++) {
      pressure.push(Number(split_line[i]));
    }
    var v37 = split_line[37].replace('\u0000', '');
    pressure.push(Number(v37));
    //console.log(pressure);

    var new_cushion = new cushion({
      id: cushion_id,
      time: cushion_time,
      p00: pressure[0],
      p01: pressure[1],
      p02: pressure[2],
      p03: pressure[3],
      p04: pressure[4],
      p05: pressure[5],
      p10: pressure[6],
      p11: pressure[7],
      p12: pressure[8],
      p13: pressure[9],
      p14: pressure[10],
      p15: pressure[11],
      p20: pressure[12],
      p21: pressure[13],
      p22: pressure[14],
      p23: pressure[15],
      p24: pressure[16],
      p25: pressure[17],
      p30: pressure[18],
      p31: pressure[19],
      p32: pressure[20],
      p33: pressure[21],
      p34: pressure[22],
      p35: pressure[23],
      p40: pressure[24],
      p41: pressure[25],
      p42: pressure[26],
      p43: pressure[27],
      p44: pressure[28],
      p45: pressure[29],
      p50: pressure[30],
      p51: pressure[31],
      p52: pressure[32],
      p53: pressure[33],
      p54: pressure[34],
      p55: pressure[35]
    });

    new_cushion.save(function(error, data) {
      if (error) {
        console.log(error);
      } else {
        //console.log('Data Saved..');
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
