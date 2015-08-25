var express = require('express'),
    gameApi = require('./games_api'),
    morgan = require('morgan'),
    app = express(),
    server;

app.use(morgan('combined'));

app.use('/api', gameApi);

app.get('/', function _index(request, response) {
  response.send ('Worst Player Award Index');
});

server = app.listen(3000, function _server() {
  var port = server.address().port;

  console.log('Worst Player server running at http://localhost:%s', port);
});
