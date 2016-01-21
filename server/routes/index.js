/**
 * Created by jeremycloutier on 1/20/16.
 */
var express = require('express');
var path = require('path');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/talent_database';

var router = express.Router();


router.get('/', function(request, response){
   response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.post('/addSkills', function(request, response){
    var data = {name: request.body.skill};

    pg.connect(connectionString, function(err, client, done) {

        // Handle Errors
        if(err) {
            console.log(err);
        }

        // SQL Query > Insert Data.
        var query = client.query("INSERT INTO skills(name) values($1)", [data.name]);

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
        });
    });
});

router.get('/getSkillz', function(request, response){
   pg.connect(connectionString, function(err, client, done){
       var results = [];

       if(err) {
           console.log(err);
       }
       // SQL Query > Select Data
       var query = client.query("SELECT * FROM skills ORDER BY id ASC");

       // Stream results back one row at a time
       query.on('row', function(row) {
           results.push(row);
       });
       // After all data is returned, close connection and return results
       query.on('end', function() {
           client.end();
           return response.json(results);
       });
   });
});

router.get('/getTalent', function(request, response){
    pg.connect(connectionString, function(err, client, done){
        var results = [];

        if(err) {
            console.log(err);
        }
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM talent ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return response.json(results);
        });
    });
});


module.exports = router;