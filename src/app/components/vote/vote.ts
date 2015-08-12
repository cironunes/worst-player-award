import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';

import {PlayerVote} from './PlayerVote';
import {PlayerService} from '../../services/PlayerService';

let template = require('./vote.html');

@Component({
  selector: 'vote'
})
@View({
  template: template,
  directives: [PlayerVote]
})
export class Vote {
  players;
  player;

  constructor(params: RouteParams, playerService: PlayerService) {
    this.players = playerService.get('players');
    this.player = this.players[params.get('player')];
    this.player.$index = params.get('player');
  }
}
