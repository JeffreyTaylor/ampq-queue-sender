'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var sender = require('./server/queue/queue-sender.js');


app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));


// putting routes here until the app gets more complicated
// then should move to controllers
app.get('/', function (req, res) {

    return res.sendFile(__dirname + "/client/app/index.html");

});


app.post('/message', function (req, res) {

    var server = req.body.server;
    var queueName = req.body.queueName;
    var data = req.body.data;

    console.log(server);
    console.log(queueName);
    console.log(data);

    sender.send(server, queueName, data, function (error, data) {

        if (error) { res.sendStatus(500) }
        else {

            res.sendStatus(200);

        }

    });



});

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
    console.log('Express server process is pid ' + process.pid);
});

