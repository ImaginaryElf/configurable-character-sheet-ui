import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { GameRepository } from '../repositories/game.repository';
import { Game } from '../models/game';

export interface ApiResponse {
  status: boolean;
  data: any;
}

function createGameObject(responseData: any) {
  return new Game(
    responseData['_id']['$oid'],
    responseData['gm_id'],
    responseData['name'],
    responseData['schema'],
    responseData['layout'],
    responseData['players']
  );
}

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  apiBaseUrl = 'https://configurable-sheet-api-prod.herokuapp.com';
  constructor(private http: HttpClient, private gameRepo: GameRepository) {}

  getGameById(gameId: string) {
    return this.http.get(`${this.apiBaseUrl}/game?game_id=${gameId}`).pipe(
      tap((result) => {
        const response = result as ApiResponse;
        if (response && response.status && response.data.length > 0) {
          this.gameRepo.updateCurrentGame(createGameObject(response.data[0]));
        }
      })
    );
  }

  getGamesByPlayer(playerId: string) {
    return this.http.get(`${this.apiBaseUrl}/game?player_id=${playerId}`).pipe(
      tap((result) => {
        const response = result as ApiResponse;
        if (response && response.status && response.data.length > 0) {
          this.gameRepo.updatePlayerGames(
            response.data.map((g: any) => createGameObject(g))
          );

          this.gameRepo.updateCharacterList(
            response.data.flatMap((g: any) =>
              g.players
                .flatMap((p: any) => p.characters)
                .map((c: any) => {
                  return { ...c, gameName: g.name };
                })
            )
          );
        }
      })
    );
  }

  getGamesByGm(gmId: string) {
    return this.http.get(`${this.apiBaseUrl}/game?gm_id=${gmId}`).pipe(
      tap((result) => {
        const response = result as ApiResponse;
        if (response && response.status && response.data.length > 0) {
          this.gameRepo.updateGmGames(
            response.data.map((g: any) => createGameObject(g))
          );
        }
      })
    );
  }

  getGameByCharacter(characterId: string) {
    return this.http
      .get(`${this.apiBaseUrl}/game?character_id=${characterId}`)
      .pipe(
        tap((result) => {
          const response = result as ApiResponse;
          if (response && response.status && response.data.length > 0) {
            console.log(createGameObject(response.data[0]));
            this.gameRepo.updateCurrentGame(createGameObject(response.data[0]));
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
