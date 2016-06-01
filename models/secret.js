var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var secretSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  location: String,
  enigma: String,
  latitude: Number,
  longitude: Number
});

var Secret = mongoose.model('Secret', secretSchema);
module.exports = Secret;
