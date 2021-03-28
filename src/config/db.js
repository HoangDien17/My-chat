const mongoose = require('mongoose');

let Connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/my_chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
    console.log('Connect successfully !');
  } catch (error) {
    console.log('Connect failure !!!');
  }
};

module.exports = { Connect };

