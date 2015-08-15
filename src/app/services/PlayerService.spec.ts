import {PlayerService, IPlayer, IPlayerState} from './PlayerService';

class Players implements IPlayerState {
  players: Array<IPlayer>;

  constructor() {
    this.players = [new Player('Andre', 4), new Player('Ciro', 10)];
  }
}

class Player implements IPlayer {
  id: number;
  name: string;
  votedIn: IPlayer;

  constructor(name: string, id: number) {
    this.id = id;
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
        var lastAdded;

        playerService.add('Ciro');
        lastAdded = playerService._state.players[playerService._state.players.length - 1];
        expect(lastAdded.name).toBe('Ciro');
        expect(lastAdded.id).toBe(1);
        expect(lastAdded.avatar).toBe('http://api.adorable.io/avatars/40/1');
      });

      it('should increment the ids', () => {
        var lastAdded;

        playerService.add('Ciro');
        lastAdded = playerService._state.players[playerService._state.players.length - 1];
        expect(lastAdded.id).toBe(1);

        playerService.add('Andre');
        lastAdded = playerService._state.players[playerService._state.players.length - 1];
        expect(lastAdded.id).toBe(2);
      });
    });

    describe('#remove', () => {
      it('should remove items from the `players` collection by the ID', () => {
        expect(playerService._state.players.length).toBe(2);
        expect(playerService._state.players[0].id).toBe(4);

        playerService.remove(4);
        expect(playerService._state.players.length).toBe(1);
        expect(playerService._state.players[0].id).toBe(10);

        playerService.remove(10);
        expect(playerService._state.players.length).toBe(0);
      });
    });
  });
});
