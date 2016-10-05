var express = require('express');
var app = express();
var mysql      = require('mysql');

var connection = mysql.createConnection({
  		host: 'localhost',
			user: 'root',
			port: 3306,
			password: '',
			database: 'places',
			multipleStatements: true
});

// Plot some points with a map  https://www.youtube.com/watch?v=7mkOVjRz3tg


connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('NYS history coming to you live from the console!');
});