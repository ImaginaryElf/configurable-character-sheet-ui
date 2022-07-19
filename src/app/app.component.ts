import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { GameRepository } from '../repositories/game.repository';
import { ApiClientService } from '../services/api-client.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Configurable Character Sheet';
  gmGames: Game[] | undefined;
  playerGames: Game[] | undefined;
  isHandset: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  subscriptions: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
    private breakpointObserver: BreakpointObserver,
    private gameRepo: GameRepository,
    private apiClient: ApiClientService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.auth.user$.pipe(distinctUntilChanged()).subscribe((u) => {
        if (u && u.email) {
          this.apiClient.getGamesByGm(u.email).subscribe();
          this.apiClient.getGamesByPlayer(u.email).subscribe();
        }
      })
    );
    this.subscriptions.add(
      this.gameRepo.gmGames$.subscribe((g) => {
        this.gmGames = g;
      })
    );

    this.subscriptions.add(
      this.gameRepo.playerGames$.subscribe((g) => {
        this.playerGames = g;
      })
    );

    this.subscriptions.add(
      this.isHandset$.subscribe((ih) => {
        this.isHandset = ih;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
