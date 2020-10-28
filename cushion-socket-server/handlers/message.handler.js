require('../models/Current');
require('../models/Cushion');
require('../models/User');
require('../models/Client');
require('../models/Log');

const mongoose = require('mongoose');
const CushionSchema = mongoose.model('Cushion');
const LogSchema = mongoose.model('Log');
const CurrentSchema = mongoose.model('Current');
const UserSchema = mongoose.model('User');
const ClientSchema = mongoose.model('Client');

// 쿠션아이디가
// 숫자 말고
// 디비에 있는 오브젝트 아이디어야 한다.
// 굿나잇

const saveLog = async ({ cushionId, data }) => {
  console.log(cushionId, data);
  const log = new LogSchema({
    text: data.text,
    createdAt: data.createdAt,
    user: data.user._id,
    cushion: cushionId
  });

  await log.save(function(err, data) {
    if (err) {
      console.log(error);
    } else {
      console.log('log Saved..');
    }
  });
  console.log('savelog', log._id);

  return log._id;
};

const getUser = async ({ socketId, userId, users }) => {
  // 있으면 가져와
  const user = users.map(user => (user.id === userId ? user : null))[0];

  if (!user) {
    try {
      const { name, avatar } = await UserSchema.findById(userId);

      const newUser = { id: userId, name, avatar, socketId };
      users.push(newUser);
      console.log(users);

      return newUser;
    } catch (err) {
      console.log(users);
      console.log(err);
    }
  }
  return user;
};

const createMessage = ({ logId, user, text }) => {
  console.log('create', logId);
  const message = {
    _id: logId,
    text,
    createdAt: new Date(),
    user: {
      _id: user.id,
      name: user.username,
      avatar: user.avatar
    }
  };
  console.log(JSON.stringify(message));
  return message;
};

const handleMessage = (socket, users) => {
  socket.on('message', async ({ cushionId, data }) => {
    console.log('recived on server');

    const schema = data;
    schema.cushion = cushionId;

    const log = new LogSchema(schema);

    await log.save(function(err, data) {
      if (err) {
        console.log(error);
      } else {
        console.log('log Saved..');
      }
    });
    console.log('savelog', log._id);

    // const logId = saveLog({ cushionId, data });
    // console.log('handle', logId);
    // broadcast
    console.log(data);

    // const user = await getUser({
    //   socketId: socket.id,
    //   id: data.user._id,
    //   users
    // });
    // console.log(user);
    // const newData = createMessage({
    //   logId,
    //   user: { id: data.user._id },
    //   text: data.text
    // });

    socket.to(cushionId).broadcast.emit('message', { cushionId, data });
    // io.to(cushionId).emit('message', { cushionId, message });
  });
};

module.exports = { createMessage, handleMessage };
