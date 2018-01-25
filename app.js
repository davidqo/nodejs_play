var express = require('express');
var pug = require('pug');

var app = express();

// index_html = pug.renderFile('./views/index.pug', {
//   name: 'Sucker'
// });

compiled_template = pug.compileFile('./views/index.pug');

app.get('/', function (req, res) {
   res.send(compiled_template({name: "Sasay"}));
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
