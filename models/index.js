var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI ||
                  process.env.MONGOHQ_URL ||
                  'mongodb://localhost/SFsecrets' );


module.exports = {
  User: require('./user'),
  Secret: require('./secret')
};
