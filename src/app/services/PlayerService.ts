import {bind, Inject, Injectable} from 'angular2/angular2';

interface IPlayer {
  id: number;
  name: string;
  votedIn?: IPlayer;
}

interface IPlayerState {
  players: Array<IPlayer>;
}

let _id = 0;

let initialPlayersState:IPlayerState = {
  players: []
};

@Injectable()
export class PlayerService {
  _state: IPlayerState;

  constructor(@Inject('initialPlayersState') players: IPlayerState) {
    this._state = players;
  }

  get(type: string) {
    return this._state[type];
  }

  set(prop: any, value?: any) {
    this._state = (value === undefined) ? prop : Object.assign({}, {
      [prop]: value
    });
  }

  add(name) {
    var players = this.get('players').slice(),
        id = _getNextId();
    players.push({
      id: id,
      name: name,
      avatar: 'http://api.adorable.io/avatars/40/' + id
    });

    this.set('players', players);
  }

  remove(index) {
    var players = this.get('players').slice();
    players.splice(index, 1);

    this.set({
      players: players
    });
  }

  vote(from, target) {
    var players = this.get('players').slice();
    players[from].votedIn = players[target];
    this.set('players', players);
  }

  getLoser() {
    var players = this.get('players').slice();
    var votes = {};
    var votedIn;
    var biggerScore = 0;
    var loser;

    players.forEach(function(player) {
      votedIn = player.votedIn.id;

      if (typeof votes[votedIn] === 'number') {
        votes[votedIn] += 1;
      } else {
        votes[votedIn] = 1;
      }
    });

    for (let id in votes) {
      if (votes[id] > biggerScore) {
        biggerScore = votes[id];
        loser = this.getPlayerById(id);
        loser.votes = votes[id];
      }
    }

    return loser;
  }

  getPlayerById(id) {
    var players = this.get('players').slice();
    var playerFound;

    playerFound = players.filter((player) => {
      return '' + player.id === id;
    })[0];

    return playerFound;
  }

  isVotationOpen() {
    var players = this.get('players').slice();
    var votationOpen = false;

    players.forEach(function(player) {
      if (typeof player.votedIn === 'undefined') {
        votationOpen = true;
      }
    });

    return votationOpen;
  }
}

function _getNextId() {
  _id += 1;
  return _id;
}

export var playerInjectables: Array<any> = [
  bind('initialPlayersState').toValue(initialPlayersState),
  bind(PlayerService).toClass(PlayerService)
];
