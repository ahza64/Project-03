var mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost/SFsecrets' ||
                  process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL );


module.exports = {
  User: require('./user'),
  Secret: require('./secret')
};
