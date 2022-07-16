import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    const params = [];
    if (gmId) {
      console.log(gmId);
      params.push(`gm_id=${gmId}`);
    }
    if (playerId) {
      console.log(playerId);
      params.push(`player_id=${playerId}`);
    }
    if (gameId) {
      console.log(gameId);
      params.push(`game_id=${gameId}`);
    }
    if (characterId) {
      console.log(characterId);
      params.push(`character_id=${characterId}`);
    }
    console.log(`${this.apiBaseUrl}/game?${params.join('&')}`);
    return this.http.get(`${this.apiBaseUrl}/game?${params.join('&')}`).pipe(
      tap((result) => {
        console.log(result);
        const response = result as ApiResponse;
        if (response && response.status) {
          this.gameRepo.updateGames(
            response.data.map((g: any) => (g.id = g['_id']['$oid']))
          );

          this.gameRepo.updateCharacters(
            response.data.flatMap((g: any) =>
              g.players
                .filter(
                  (p: any) => p.player_id == playerId && p.characters.length > 1
                )
                .flatMap((c: any) => c.characters)
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
