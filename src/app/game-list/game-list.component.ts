import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { GameRepository } from '../../repositories/game.repository';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit, OnDestroy {
  gameList: Game[] | undefined;
  cardStyles = { row: 1, col: 3 };
  subscriptions: Subscription = new Subscription();

  constructor(
    public gameRepo: GameRepository,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.gameRepo.games$.subscribe((gl) => {
        this.gameList = gl;
      })
    );

    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.Medium])
        .pipe(distinctUntilChanged())
        .subscribe((bp) => {
          if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
            this.cardStyles = { row: 1, col: 12 };
          } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
            this.cardStyles = { row: 1, col: 6 };
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
