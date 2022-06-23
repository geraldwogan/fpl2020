var mysql = require('mysql');

///////////////////////////////////////////////////////////////////////////////////////////

// Setup MySQL connection
// timezone is very NB

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'fpl2020',
  timezone : 'utc+0'  
});

connection.connect(function(err){
	if(err) throw err;
	console.log(`Sucessfully connected to MySQL database fpl2020`);
});

///////////////////////////////////////////////////////////////////////////////////////////

// GET /teams
exports.getTeams = function(req,res){
    //console.log(`${req.params.id}`);
    connection.query(`SELECT * FROM teams ORDER BY name ASC`, function(err, rows, fields) {
        if (err) throw err;

        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET /team/ID
exports.getTeam = function(req,res){
    connection.query(`SELECT * FROM teams WHERE id='${req.params.id}'`, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });
}

// GET teamMatches/ID
exports.getTeamMatches = function(req,res){
    connection.query(`SELECT * FROM fixtures WHERE team_h='${req.params.id}' OR team_a='${req.params.id}' ORDER BY gameweek ASC `, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET teamMatchesAlt/ID
exports.getTeamMatchesAlt = function(req,res){
    connection.query(`SELECT f.gameweek, f.team_h, f.team_h_score, f.team_a, f.team_a_score, t.name as team_h_name, te.name as team_a_name FROM fixtures as f 
                    INNER JOIN teams as t ON f.team_h=t.id 
                    INNER JOIN teams as te ON f.team_a=te.id
                    WHERE team_h='${req.params.id}' OR team_a='${req.params.id}' 
                    ORDER BY f.gameweek ASC`, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET teamPlayers/ID
exports.getTeamPlayers = function(req,res){
    connection.query(`SELECT * FROM players WHERE teamid='${req.params.id}' ORDER BY total_points DESC`, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}
// GET gameweeks
exports.getGameweeks = function(req,res){
    connection.query(`SELECT g.id, g.name, g.finished, g.deadline_time, players.web_name, g.deadline_time as dateandtime 
                    FROM gameweeks as g INNER JOIN players ON g.most_captained=players.id 
                    ORDER BY g.id`, function(err, rows, fields) {
        if (err) throw err;

        //Adjust gameweeks.deadline_time to a more readable format
        //Changes "2020-11-21T11:00:00Z" to "2020-11-20 11:00"
        var day, month, hour;
        for(i=0; i< rows.length; i++)
        {
            //Change hour for Daylight Savings
            month = parseInt(rows[i].dateandtime.substring(5,7));
            day = parseInt(rows[i].dateandtime.substring(8,10));
            hour = parseInt(rows[i].dateandtime.substring(11,13));

            if((month == 9)||( month == 10 && day < 25))//Only applicable to a dataset from September to sometime in March 2021
                hour = hour +1;

            rows[i].dateandtime = rows[i].dateandtime.substring(0,10) + " " +hour + rows[i].dateandtime.substring(13,16);
        }

        //DATE_FORMAT(FROM_UNIXIMW)

        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET fixtures/ID
exports.getFixtures = function(req,res){
    connection.query(`SELECT * FROM fixtures WHERE gameweek='${req.params.id}' ORDER BY kickoff_time ASC`, function(err, rows, fields) {
      if (err) throw err;
      res.status(200);  // OK
      res.send(JSON.stringify(rows));	  
  });	
}

// GET fixturesAlt/ID
exports.getFixturesAlt = function(req,res){
    connection.query(`SELECT f.gameweek, f.kickoff_time, f.team_h, f.team_h_score, f.team_a, f.team_a_score, t.name as team_h_name, te.name as team_a_name, t.strength as team_h_strength, te.strength as team_a_strength FROM fixtures as f 
                    INNER JOIN teams as t ON f.team_h=t.id 
                    INNER JOIN teams as te ON f.team_a=te.id
                    WHERE f.gameweek='${req.params.id}' ORDER BY f.kickoff_time ASC`, function(err, rows, fields) {
      if (err) throw err;
      res.status(200);  // OK
      res.send(JSON.stringify(rows));	  
  });	
}

// GET /players
exports.getPlayers = function(req,res){
    connection.query(`SELECT players.id as id, second_name, first_name, form, now_cost, photo, teams.id as teamid, total_points,
                    web_name, minutes, goals_scored, assists, goals_conceded, yellow_cards, red_cards 
                    FROM players, teams WHERE players.teamid=teams.id 
                    ORDER BY total_points DESC, web_name DESC`, function(err, rows, fields) {
      if (err) throw err;
      res.status(200);  // OK
      res.send(JSON.stringify(rows));	  
  });	
}

// GET /playersAlt
exports.getPlayersAlt = function(req,res){
    connection.query(`SELECT DISTINCT players.id as id, second_name, first_name, form, now_cost, photo, teams.id as teamid, total_points,
                    web_name, minutes, goals_scored, assists, goals_conceded, yellow_cards, red_cards, teams.name, teams.short_name 
                    FROM players, teams WHERE players.teamid=teams.id 
                    ORDER BY total_points DESC, web_name DESC`, function(err, rows, fields) {
      if (err) throw err;
      res.status(200);  // OK
      res.send(JSON.stringify(rows));	  
  });	
}

// GET /playersAlt/teamid
exports.getPlayersAltID = function(req,res){
    connection.query(`SELECT DISTINCT players.id as id, second_name, first_name, form, now_cost, photo, teams.id as teamid, total_points,
                    web_name, minutes, goals_scored, assists, goals_conceded, yellow_cards, red_cards, teams.name, teams.short_name 
                    FROM players, teams WHERE players.teamid=teams.id AND players.teamid='${req.params.id}' 
                    ORDER BY total_points DESC, web_name DESC`, function(err, rows, fields) {
      if (err) throw err;
      res.status(200);  // OK
      res.send(JSON.stringify(rows));	  
  });	
}

// GET teamStats
exports.getTeamStats = function(req,res){
    connection.query(`SELECT DISTINCT t.id, t.name, t.short_name, 
                    SUM(p.total_points) as total_points, 
                    SUM(p.goals_scored) as goals_scored, 
                    SUM(p.yellow_cards + p.red_cards) as total_cards 
                    FROM teams as t 
                    INNER JOIN players as p ON p.teamid=t.id 
                    GROUP BY t.id`, function(err, rows, fields) {
      res.status(200);  // OK
      res.send(JSON.stringify(rows));	  
  });	
}

// GET /playersStats/ID
exports.getPlayerStats = function(req,res){
    connection.query(`SELECT ps.playerid, ps.gameweek, ps.opponentid, ps.total_points, ps.cost, ps.minutes, ps.goals_scored, ps.assists, ps.yellow_cards, ps.red_cards,
                    p.photo, t.id as teamid, t.name FROM playerstats as ps 
                    INNER JOIN players as p ON ps.playerid=p.id 
                    INNER JOIN teams as t on ps.opponentid=t.id
                    WHERE ps.playerid='${req.params.id}' ORDER BY ps.gameweek ASC`, function(err, rows, fields) {
      if (err) throw err;
      res.status(200);  // OK
      res.send(JSON.stringify(rows));	  
  });	
}

// GET /users
exports.getUsers = function(req,res){
    connection.query(`SELECT * FROM users`, function(err, rows, fields) {
      if (err) throw err;
      res.status(200);  // OK
      res.send(JSON.stringify(rows));	  
  });	
}

// GET /users/email (Unused)
exports.getUser = function(req,res){
    connection.query(`SELECT * FROM users WHERE email = '${req.params.email}'`, function(err, rows, fields) {
      if (err) throw err;
      res.status(200);  // OK
      res.send(JSON.stringify(rows));	  
  });	
}

// PUT /team/ID
exports.putTeam = function(req,res){
    //console.log(req.body.strength);
    connection.query(`UPDATE teams 
                      SET strength = '${req.body.strength}',strength_overall_home = '${req.body.strengthHome}', strength_overall_away = '${req.body.strengthAway}' 
                      WHERE id = '${req.body.id}'`, function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.status(201);  // OK
        return; // Fixes Error code: 'ERR_HTTP_HEADERS_SENT'

        res.send(JSON.stringify(rows));	  
    });	
}
