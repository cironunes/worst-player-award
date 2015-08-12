import {Component, View} from 'angular2/angular2';
import {Location} from 'angular2/router';

import {angularDirectives} from '../../directives/directives';
import {PlayerService} from '../../services/PlayerService';

let template = require('./player-vote.html');

@Component({
  selector: 'player-vote',
  properties: ['player', 'players']
})
@View({
  template: template,
  directives: [angularDirectives]
})
export class PlayerVote {
  playerService;
  location;

  constructor(playerService: PlayerService, location: Location) {
    this.playerService = playerService;
    this.location = location;
  }

  vote(from, target) {
    this.playerService.vote(from, target);
    this.location.back();
  }
}
