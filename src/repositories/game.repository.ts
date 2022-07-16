import { createStore } from '@ngneat/elf';
import {
  selectAllEntities,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { Game } from '../models/game';
import { Injectable } from '@angular/core';
import { Player } from '../models/player';

const gameStore = createStore({ name: 'games' }, withEntities<Game>());
const charStore = createStore({ name: 'characters' }, withEntities<Player>());

@Injectable({ providedIn: 'root' })
export class GameRepository {
  constructor() {}
  games$ = gameStore.pipe(selectAllEntities());
  characters$ = charStore.pipe(selectAllEntities());

  updateGames(games: Game[]) {
    gameStore.update(setEntities(games));
  }

  updateCharacters(characters: Player[]) {
    charStore.update(setEntities(characters));
  }
}
