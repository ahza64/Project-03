var auth = require('../middleware/auth');
var db = require('../models'),
    User = db.User,
    Secret = db.Secret;

function index(req, res) {
  Secret
    .find({})
    .populate('user')
    .exec(function(err, secrets){
      if (err || !secrets || !secrets.length) {
        return res.status(404).send({message: 'Secrets not found.'});
      }
      res.send(secrets);
    });
}

function create(req, res){
  var new_secret = new Secret(req.body);
  new_secret.user = req.user_id;
  new_secret.save(function(err, new_secret){
    res.send(new_secret);
  });
}

function show(req, res){
  Secret
    .findById(req.params.id)
    .populate('user')
    .exec(function(err, found_secret){
      if (err || !found_secret) {
        return res.status(404).send({message: 'Secret not found.'});
      }

      res.send(found_secret);
    });
}

function update(req, res){
  var query = {
    _id: req.params.id
  };

  if (req.user_id) {
    query.user = req.user_id;
  }

  Post
    .findOneAndUpdate(query, req.body)
    .exec(function(err, secret){
      if (err || !secret) {
        console.log(secret);
        return res.status(404).send({messsage: 'Failed to revise secret.'});
      }
      res.status(204).send();
    });
}

function destroy(req, res){
  var query = {
    _id: req.params.id
  };

  if (req.user_id) {
    query.user = req.user_id;
  }

  Secret
    .findOneAndRemove(query)
    .exec(function(err, secret){
      if (err || !secret) {
        return res.status(404).send({messsage: 'Failed to erase secret.'});
      }
      res.status(204).send();
    });
}

module.exports = {
  index: index,
   create: create,
   show: show,
   update: update,
   destroy: destroy
};
