import { createStore } from '@ngneat/elf';
import {
  selectAllEntities,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { Game } from '../models/game';
import { Injectable } from '@angular/core';

const gameStore = createStore({ name: 'games' }, withEntities<Game>());

@Injectable({ providedIn: 'root' })
export class GameRepository {
  constructor() {}
  games$ = gameStore.pipe(selectAllEntities());

  updateGames(games: Game[]) {
    gameStore.update(setEntities(games));
  }
}
