var express = require('express'),
    router = express.Router(),
    morgan = require('morgan');

//creating routes for [...]/games
router.route('/games')
  .get(function _getGames(request, response) {
    response.send('Get games');
  })

  .post(function _saveGames(request, response) {
    response.send('Save games');
  });

// creating sub-route for [...]/games/{game_id}
router.route('/games/:game_id')
  .get(function _getGameById(request, response) {
    response.send('Get game: ' + request.params.game_id);
  })

  .put(function _updateGame(request, response) {
    response.send('Editing game: ' + request.params.game_id);
  })
  
  .delete(function _deleteGame(request, response) {
    response.send('Delete game: ' + request.params.game_id);
  });

module.exports = router;
