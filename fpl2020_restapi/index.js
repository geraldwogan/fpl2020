var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var model = require('./model/db.js');  //

var app = express();
app.use(cors());

// serves files in public folder
app.use(express.static('public'));

// NB:: this must be included to get JSON content sent with requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

///////////////////////////////////////////////////////////////////////////////////////////

// REST API /teams GET route
app.route('/teams/')
.get(function (req, res) {  
  model.getTeams(req, res);
})

// REST API /teamMatches/id GET route
app.route('/teamMatches/:id?')
.get(function (req, res) {  
  model.getTeamMatches(req, res);
});

// REST API /teamMatchesAlt/id GET route
app.route('/teamMatchesAlt/:id?')
.get(function (req, res) {  
  model.getTeamMatchesAlt(req, res);
});

// REST API /teamPlayers/id GET route
app.route('/teamPlayers/:id?')
.get(function (req, res) {  
  model.getTeamPlayers(req, res);
});

// REST API /gameweeks GET route
app.route('/gameweeks')
.get(function (req, res) {  
  model.getGameweeks(req, res);
});

// REST API /fixtures/1 GET route
app.route('/fixtures/:id?')
.get(function (req, res) {  
  model.getFixtures(req, res);
});

// REST API /fixturesAlt/1 GET route
app.route('/fixturesAlt/:id?')
.get(function (req, res) {  
  model.getFixturesAlt(req, res);
});

// REST API /players GET route
app.route('/players/')
.get(function (req, res) {  
  model.getPlayers(req, res);
});

// REST API /players GET route
app.route('/playersAlt/')
.get(function (req, res) {  
  model.getPlayersAlt(req, res);
});

// REST API /teamStats GET route
app.route('/teamStats/')
.get(function (req, res) {  
  model.getTeamStats(req, res);
});

// REST API /team/id GET route (Unused)
app.route('/team/:id?')
.get(function (req, res) {  
  model.getTeam(req, res);
})

// REST API /team/id PUT route
app.route('/team/:id?')
.put(function (req, res) { // edit
  model.putTeam(req, res);
})

// REST API /players/teamid GET route
app.route('/playersAlt/:id?')
.get(function (req, res) {  
  model.getPlayersAltID(req, res);
});

// REST API /players/playerid GET route
app.route('/playerstats/:id?')
.get(function (req, res) {  
  model.getPlayerStats(req, res);
});

// REST API /login GET route
app.route('/users?')
.get(function (req, res) {  
  model.getUsers(req, res);
});

// REST API /login GET route
app.route('/users/:email?')
.get(function (req, res) {  
  model.getLogin(req, res);
});
  ///////////////////////////////////////////////////////////////////////////////////////////

var myServer = app.listen(3005, function() {
  console.log("fpl2020 Server listening on port 3005");
});
