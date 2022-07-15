import { createStore } from '@ngneat/elf';
import {
  selectAllEntities,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { Game } from '../models/game';
import { Injectable } from '@angular/core';

const store = createStore({ name: 'games' }, withEntities<Game>());

@Injectable({ providedIn: 'root' })
export class GameRepository {
  constructor() {}
  games$ = store.pipe(selectAllEntities());

  updateGames(games: Game[]) {
    store.update(setEntities(games));
  }
}
