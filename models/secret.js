var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var secretSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  location: String,
  secret: String
});

var Secret = mongoose.model('Secret', secretSchema);
module.exports = Secret;
