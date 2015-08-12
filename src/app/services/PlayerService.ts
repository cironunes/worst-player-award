import {bind, Inject, Injectable} from 'angular2/angular2';

interface IPlayer {
  name: string;
  votedIn?: IPlayer;
}

interface IPlayerState {
  players: Array<IPlayer>;
}

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
    var players = this.get('players').slice();
    players.push({ name: name });

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
      votedIn = player.votedIn.name;

      if (typeof votes[votedIn] === 'number') {
        votes[votedIn] += 1;
      } else {
        votes[votedIn] = 1;
      }
    });

    for (let player in votes) {
      if (votes[player] > biggerScore) {
        biggerScore = votes[player];
        loser = { name: player, votes: votes[player] };
      }
    }

    return loser;
  }
}

export var playerInjectables: Array<any> = [
  bind('initialPlayersState').toValue(initialPlayersState),
  bind(PlayerService).toClass(PlayerService)
];
