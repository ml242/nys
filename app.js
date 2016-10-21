var express = require('express');
var pg      = require('pg');
var path = require('path');
var env = require("./env.js");

var client = new pg.Client();
var app = express();
app.use(express.static('public'));

var places;

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


pg.defaults.ssl = true;

var pool = new pg.Pool(config);

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    // client.query('SELECT * FROM places', function(err, result) {
    client.query('SELECT * FROM places LIMIT 10;', function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
            return console.error('error running query', err);
        }
        // console.log(result.rows[0]);
        return places = result.rows;
    });
});

var userLocation = function(data){

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        // client.query('SELECT * FROM places', function(err, result) {
        client.query('SELECT name, lat, long FROM places ORDER BY the_geom <-> st_setsrid(st_makepoint(' + data +'),4326)LIMIT 10;', function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }
            console.log(result.rows);

            return places = result.rows;
        });
        return places;
    });
    return places;
}


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.get('/places', function(req, response){
  response.send({data: places, done: true, status: 200 });
});

app.get('/home', function(req, response){
  // response.send({data: places, done: true, status: 200 });
    var data = req.query.userLocation;

    var places = userLocation(data);

    response.send({data: places, done: true, status: 200 })

});


const port = 3000;

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
    console.log('NYS history coming to you live');

});

