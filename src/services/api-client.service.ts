import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  apiBaseUrl = "";
  constructor(private http: HttpClient) { }

  getGame(game_id: string) {
    return this.http.get(`${this.apiBaseUrl}/game?id=${game_id}`)
  }

  saveGame(game_schema_json: object) {
    this.http.post(`${this.apiBaseUrl}/game`, game_schema_json)
  }
}
