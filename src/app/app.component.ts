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
  games: Game[] | undefined;
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
          this.apiClient.getGames(u.email, u.email, '', '').subscribe();
        }
      })
    );
    this.subscriptions.add(
      this.gameRepo.games$.subscribe((g) => {
        this.games = g;
        console.log('games store:' + JSON.stringify(this.games));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
