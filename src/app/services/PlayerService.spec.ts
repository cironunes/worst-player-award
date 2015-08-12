import {PlayerService} from './PlayerService';

interface IPlayer {
  name: string;
  votedIn?: IPlayer;
}

interface IPlayerState {
  players: Array<IPlayer>;
}

class Players implements IPlayerState {
  players: Array<IPlayer>;

  constructor() {
    this.players = [new Player('Andre'), new Player('Ciro')];
  }
}

class Player implements IPlayer {
  name: string;
  votedIn: IPlayer;

  constructor(name: string) {
    this.name = name;
  }
}

describe('Service: Player', () => {
  var playerService;

  it('should start with empty `state`', () => {
    playerService = new PlayerService([]);
    expect(playerService._state).toEqual([]);
  });

  describe('get/set & add/remove', () => {
    var players: IPlayerState;

    beforeEach(() => {
      players = new Players();
      playerService = new PlayerService(players);
    });

    describe('#get', () => {
      it('should get the raw state', () => {
        expect(playerService.get('players')).toEqual(players.players);
      });
    });

    describe('#set', () => {
      it('should replace a property in our state', function () {
        playerService.set('players', []);
        expect(playerService._state.players).toEqual([]);
      });

      it('should replace all of the state', () => {
        playerService.set({ players: [] });
        expect(playerService._state.players).toEqual([]);
      });
    });

    describe('#add', () => {
      it('should add items to the `players` collection', () => {
        //playerService.add()
      });
    });
  });
});
