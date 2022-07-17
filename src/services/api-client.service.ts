import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { GameRepository } from '../repositories/game.repository';
import { Game } from '../models/game';

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

    return this.http.get(`${this.apiBaseUrl}/game?${params.join('&')}`).pipe(
      tap((result) => {
        const response = result as ApiResponse;
        if (response && response.status && response.data.length > 0) {
          const uniqueGameIds = [
            ...new Set(response.data.map((g: any) => g['_id']['$oid'])),
          ];
          this.gameRepo.updateGames(
            uniqueGameIds.map((id: any) => {
              const game = response.data.find(
                (g: any) => g['_id']['$oid'] == id
              );
              return new Game(
                game['_id']['$oid'],
                game['gm_id'],
                game['name'],
                game['schema'],
                game['layout'],
                game['players']
              );
            })
          );
        }
      })
    );
  }

  addGame(game: Game) {
    const gameRequest = {
      gm_id: game.gm_id,
      name: game.name,
      schema: game.schema,
      layout: game.layout,
      players: game.players,
    };
    this.http.post(`${this.apiBaseUrl}/game`, gameRequest);
  }

  updateGame(game: Game) {
    const gameRequest = {
      _id: {
        $oid: game.id,
      },
      gm_id: game.gm_id,
      name: game.name,
      schema: game.schema,
      layout: game.layout,
      players: game.players,
    };
    this.http.put(`${this.apiBaseUrl}/game`, gameRequest);
  }
}
