import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  apiBaseUrl = 'https://configurable-sheet-api-prod.herokuapp.com/';
  constructor(private http: HttpClient) {}

  getGame(game_id: string) {
    return this.http.get(`${this.apiBaseUrl}/game?game_id=${game_id}`);
  }

  addGame(game: object) {
    this.http.post(`${this.apiBaseUrl}/game`, game);
  }

  updateGame(game: object) {
    this.http.put(`${this.apiBaseUrl}/game`, game);
  }
}
