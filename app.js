var express = require('express');
var browserify = require('browserify');
var pg      = require('pg');
var path = require('path');


var client = new pg.Client();
var app = express();
app.use(express.static('public'));


var config = {
  		host: 'localhost',
			port: 5432,
			password: '',
			database: 'nys_history',
			multipleStatements: true,
      max: 10,
      idleTimeoutMills: 300000
};

// Plot some points with a map  https://www.youtube.com/watch?v=7mkOVjRz3tg

var pool = new pg.Pool(config);

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM places', function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0]);
    //output: 1 
  });
});
 

// app.get('/', function (req, res) {
//   res.send(json);
// });


app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'))
});



app.listen(3000, function () {
  // var addr = server.address();
  // console.log('NYS history coming to you live from @ http://%s:%d', addr.address, addr.port);
  console.log('NYS history coming to you live');
});