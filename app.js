var express = require('express');
var browserify = require('browserify');
var React = require('react');
var reactdom = require('react-dom')
var jsx = require('node-jsx');
var mysql      = require('mysql');

var app = express();

jsx.install();


var connection = mysql.createConnection({
  		host: 'localhost',
			user: 'root',
			port: 3306,
			password: '',
			database: 'nys_history',
			multipleStatements: true
});

// Plot some points with a map  https://www.youtube.com/watch?v=7mkOVjRz3tg

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
  var query = 'SELECT * FROM places';
  connection.query(query, function(err, results, fields) {
    if (err) {
      return callback(err, null);
    }
    console.log('The query-result is: ', results[0]);
    json = JSON.stringify(results);
  })
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