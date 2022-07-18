import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { Subscription } from 'rxjs';
import { GameRepository } from '../../repositories/game.repository';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit, OnDestroy {
  gmGames: Game[] = [];
  playerGames: Game[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(public gameRepo: GameRepository) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.gameRepo.gmGames$.subscribe((gl) => {
        this.gmGames = gl;
      })
    );
    this.subscriptions.add(
      this.gameRepo.playerGames$.subscribe((gl) => {
        this.playerGames = gl;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  gameShouldDisplay(id: PropertyKey) {
    return this.gmGames.findIndex((g) => g.id == id) == -1;
  }
}
