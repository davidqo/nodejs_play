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
  password: 'test',
  connectionTimeout: 10000,
  reconnect: false
});

// add this for better debuging
connection.on('error', function(e) {
  console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
connection.on('ready', function() {
  exchange = connection.exchange("test_exchange", {
    type: 'direct',
    confirm: true
  }, function(ex) {
    timeout = function() {
      exchange.publish("1", {
        body: "msg"
      }, [], function(res) {
        console.log("Publish result: ", res);
      });
      setTimeout(timeout, 2000);
    }
    setTimeout(timeout, 2000);
  });
});

// connection.connect();

compiled_template = pug.compileFile('./views/index.pug');

app.get('/', function(req, res) {
  res.send(compiled_template({
    name: "Sasay"
  }));
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
