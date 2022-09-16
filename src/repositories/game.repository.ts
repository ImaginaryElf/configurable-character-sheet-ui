import { createStore, select, withProps } from '@ngneat/elf';
import {
  selectAllEntities,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { Game } from '../models/game';
import { Injectable } from '@angular/core';

const gmGamesStore = createStore({ name: 'gmGames' }, withEntities<Game>());
const playerGamesStore = createStore(
  { name: 'playerGames' },
  withEntities<Game>()
);
const gameStore = createStore(
  { name: 'game' },
  withProps<Game>(new Game('', '', '', null, null, []))
);
const characterListStore = createStore(
  { name: 'characterList' },
  withEntities<any>()
);

@Injectable({ providedIn: 'root' })
export class GameRepository {
  constructor() {}
  gmGames$ = gmGamesStore.pipe(selectAllEntities());
  playerGames$ = playerGamesStore.pipe(selectAllEntities());
  game$ = gameStore.pipe(select((state) => state));
  characterList$ = characterListStore.pipe(selectAllEntities());

  updateGmGames(gmGames: Game[]) {
    gmGamesStore.update(setEntities(gmGames));
  }

  updatePlayerGames(playerGames: Game[]) {
    playerGamesStore.update(setEntities(playerGames));
  }

  updateCurrentGame(game: Game) {
    gameStore.update(() => (game));
  }

  updateCharacterList(characterList: any[]) {
    characterListStore.update(setEntities(characterList));
  }
}
