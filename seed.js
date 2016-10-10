var db = require("./models");

var user_a = {
  email: "sample@email.com",
  password: "a",
  displayName: "James Bourne"
};

var secrets = [
  {
    location: "30 Seward St, San Francisco",
    enigma: "A tiny secluded park with huge dual slides, for fun and racing. Besure to bring a piece of cardboard",
    latitude: 37.758101,
    longitude: -122.4396626
  },
  {
    location: "902 Point Lobos Ave, San Francisco",
    enigma: "Hike down the trail, below the cliff house to find the ruins of the old Japanese Sutro Bath house. During the night, it's quite a sight as the reflection of the cliff house lights reflect off the water. If you're lucky enough, you'll catch an underground rock show in the tunnel",
    latitude: 37.7793383,
    longitude: -122.5126617
  },
  {
    location: "150 California St, San Francisco",
    enigma: "One of many secret roof top parks in the FiDi area. The gaurd at the front desk will ask you where you're headed. If he doesn't tell you, go to the 6th floor and head right(west) after exiting the elevator",
    latitude: 37.7936595,
    longitude: -122.39851
  },
  {
    location: "526 Clay St, San Francisco",
    enigma: "Redwood Park at the base of the Transamerica building",
    latitude: 37.794836,
    longitude: -122.401964
  },
  {
    location: "83 Marina Green Dr, San Francisco",
    enigma: "During the right tides, you can listen to the waves play music, by pressurizing air and passsing it through organ pipes",
    latitude: 37.808606,
    longitude: -122.440192
  },
  {
    location: "199 Fremont St, San Francisco",
    enigma: "A newer Urban garden, opan all times",
    latitude: 37.789601,
    longitude: -122.394799
  },
  {
    location: "916 El Camino Del Mar, San Francisco",
    enigma: "hike down the Lands End Trail, to find Mile Rock Beach. If you explore on the small paths above the beach, You can find a hidden Labyrinth.",
    latitude: 37.787920,
    longitude: -122.505903
  },
  {
    location: "355 Martin Luther King Jr Dr, San Francisco",
    enigma: "The Shakespeare Garden. Next to the California Acedemy of Science, in Golden Gate park",
    latitude: 37.768550,
    longitude: -122.467481
  },
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
