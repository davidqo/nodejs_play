var express = require('express');
var pug = require('pug');
var amqp = require('amqp');

var app = express();

// index_html = pug.renderFile('./views/index.pug', {
//   name: 'Sucker'
// });
var connection = amqp.createConnection({
  host: '192.168.23.116',
  authMechanism: 'PLAIN',
  login: 'test',
  password: 'test'
});

// add this for better debuging
connection.on('error', function(e) {
  console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
connection.on('ready', function() {
  // Use the default 'amq.topic' exchange
  connection.queue('my-queue', function(q) {
    // Catch all messages
    q.bind('test_exchange', '1', function(res) {
      console.log("Bind result: ", res);
    });
    // Receive messages
    q.subscribe(function(message) {
      // Print messages to stdout
      console.log(message);
    });
  });
});

// connection.connect();

compiled_template = pug.compileFile('./views/index.pug');

app.get('/', function(req, res) {
  res.send(compiled_template({
    name: "Sasay"
  }));
})

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});
