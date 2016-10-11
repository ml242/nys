var express = require('express');
var browserify = require('browserify');
var React = require('react');
var reactdom = require('react-dom')
var jsx = require('node-jsx');
var pg      = require('pg');

var client = new pg.Client();
var app = express();

jsx.install();


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

var Index = require('./views/index.jsx');


app.use('/', function(req, res) {
  res.send("hello")
});



app.listen(3000, function () {
  // var addr = server.address();
  // console.log('NYS history coming to you live from @ http://%s:%d', addr.address, addr.port);
  console.log('NYS history coming to you live');
});