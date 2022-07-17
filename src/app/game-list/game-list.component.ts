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
  gameList: Game[] | undefined;
  subscriptions: Subscription = new Subscription();

  constructor(public gameRepo: GameRepository) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.gameRepo.games$.subscribe((gl) => {
        this.gameList = gl;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
