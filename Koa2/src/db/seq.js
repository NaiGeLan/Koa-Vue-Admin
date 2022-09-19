const { mongoose } = require('mongoose')
const {
  MONOGO_HOST,
  MONOGO_PORT,
  MONOGO_USER,
  MONOGO_PWD,
  MONOGO_DB,
} = require('../config/config.default')
mongoose.connect(`mongodb://${MONOGO_USER}:${MONOGO_PWD}@${MONOGO_HOST}:${MONOGO_PORT}/${MONOGO_DB}`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

