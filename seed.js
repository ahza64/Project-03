var db = require("./models");

var user_a = {
  email: "a",
  password: "a",
  displayName: "James Bourne"
};

var secrets = [
  {
    location: "30 Seward St, San Francisco",
    secret: "A tiny secluded park with huge dual slides, for fun and racing. Besure to bring a piece of cardboard"
  },
  {
    location: "902 Point Lobos Ave, San Francisco",
    secret: "Hike down the trail, below the cliff house to find the ruins of the old Japanese Sutro Bath house. During the night, it's quite a sight as the reflection of the cliff house lights reflect off the water. If you're lucky enough, you'll catch an underground rock show in the tunnel"
  },
  {
    location: "150 California St, San Francisco",
    secret: "One of many secret roof top parks in the FiDi area. The gaurd at the front desk will ask you where you're headed. If he doesn't tell you, go to the 6th floor and head right(west) after exiting the elevator"
  }
];

db.User.remove({}, function(){
  db.Secret.remove({}, function(){
    db.User.create(user_a, function(err, user){
      if (err || !user) { return console.log(err); }
      var user_a_secrets = secrets.map(function(p){p.user = user._id; return p;});
      db.Secret.create(user_a_secrets, function(err, secrets){
          if (err) { return console.log(err); }
          console.log("Created", secrets.length, "secrets");
          process.exit();
        }
      );
    });
  });
});
