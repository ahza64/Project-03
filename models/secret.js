var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var secretSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String
});

var Secret = mongoose.model('Secret', secretSchema);
module.exports = Secret;
