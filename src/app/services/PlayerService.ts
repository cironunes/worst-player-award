import {bind, Inject, Injectable} from 'angular2/angular2';

export interface IPlayer {
  id: number;
  name: string;
  votedIn?: IPlayer;
}

export interface IPlayerState {
  players: Array<IPlayer>;
}

let _id = 0;

class Player {
  id: number;
  name: string;
  avatar: string;

  constructor(id: number, name: string, avatar: string) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
  }
}

let initialPlayersState:IPlayerState = {
  players: []
};

@Injectable()
export class PlayerService {
  _id: number;
  _state: IPlayerState;

  constructor(@Inject('initialPlayersState') players: IPlayerState) {
    this._state = players;
    this._id = 0;
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
        id = this._getNextId(),
        avatar = 'http://api.adorable.io/avatars/40/' + id,
        player: IPlayer;

    player = new Player(id, name, avatar);

    players.push(player);

    this.set('players', players);
  }

  remove(id: number) {
    var players = this.get('players').slice();

    players = players.filter((player) => {
      return player.id !== id;
    });

    this.set({
      players: players
    });
  }

  vote(from, target) {
    var playerVoting = this.getPlayerById(from),
        playerVoted = this.getPlayerById(target);

    playerVoting.votedIn = playerVoted;

    this.set('players', this.get('players'));
  }

  // TODO: write tests
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
      return '' + player.id === '' + id;
    })[0];

    if (!playerFound) {
      throw new Error(`Not found a player with id: ${id}`);
    }

    return playerFound;
  }

  // TODO: write tests
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

  _getNextId() {
    this._id += 1;
    return this._id;
  }
}


export var playerInjectables: Array<any> = [
  bind('initialPlayersState').toValue(initialPlayersState),
  bind(PlayerService).toClass(PlayerService)
];
