import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { GameRepository } from '../../repositories/game.repository';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-char-list',
  templateUrl: './char-list.component.html',
  styleUrls: ['./char-list.component.scss'],
})
export class CharListComponent implements OnInit, OnDestroy {
  userId: string | undefined;
  characterList: any[] | undefined;
  cardStyles = { row: 1, col: 3 };
  subscriptions: Subscription = new Subscription();

  constructor(
    public gameRepo: GameRepository,
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe((params: any) => {
        this.userId = params.get('uid');
      })
    );
    this.subscriptions.add(
      this.gameRepo.games$.subscribe((gl) => {
        this.characterList = gl.flatMap((g: any) =>
          g.players
            .filter((p: any) => p.id == this.userId)
            .flatMap((p: any) => p.characters)
        );
      })
    );

    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.Medium])
        .pipe(distinctUntilChanged())
        .subscribe((bp) => {
          if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
            this.cardStyles = { row: 1, col: 1 };
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
