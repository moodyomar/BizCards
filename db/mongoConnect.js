const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/hipo5', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://moody:moody123@cluster0.gp2nf.mongodb.net/hipo7', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo connected7");
  // we're connected!
});

module.exports = db;
