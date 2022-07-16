import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
import { GameRepository } from '../repositories/game.repository';

export interface ApiResponse {
  status: boolean;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  apiBaseUrl = 'https://configurable-sheet-api-prod.herokuapp.com';
  constructor(private http: HttpClient, private gameRepo: GameRepository) {}

  getGames(
    gmId: string,
    playerId: string,
    gameId: string,
    characterId: string
  ) {
    const params = new HttpParams();
    if (gmId) {
      params.set('gm_id', gmId);
    }
    if (playerId) {
      params.set('player_id', playerId);
    }
    if (gameId) {
      params.set('game_id', gameId);
    }
    if (characterId) {
      params.set('character_id', characterId);
    }
    return this.http.get(`${this.apiBaseUrl}/game`, { params }).pipe(
      tap((result) => {
        console.log(result);
        const response = result as ApiResponse;
        if (response && response.status) {
          this.gameRepo.updateGames(
            response.data.map((g: any) => (g.id = g['_id']['$oid']))
          );

          this.gameRepo.updateCharacters(
            response.data.flatMap((g: any) =>
              g.players.filter((p: any) => p.id == playerId)
            )
          );
        }
      })
    );
  }

  addGame(game: object) {
    this.http.post(`${this.apiBaseUrl}/game`, game);
  }

  updateGame(game: object) {
    this.http.put(`${this.apiBaseUrl}/game`, game);
  }
}
