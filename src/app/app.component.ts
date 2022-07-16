import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { GameRepository } from '../repositories/game.repository';
import { ApiClientService } from '../services/api-client.service';
import { Game } from '../models/game';
import { Player } from '../models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Configurable Character Sheet';
  games: Game[] | undefined;
  characters: Player[] | undefined;
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
      this.auth.user$.subscribe((u) => {
        if (u && u.email) {
          this.apiClient.getGames(u.email, u.email, '', '');
        }
      })
    );
    this.subscriptions.add(
      this.gameRepo.games$.subscribe((g) => {
        this.games = g;
        console.log(JSON.stringify(this.games));
      })
    );
    this.subscriptions.add(
      this.gameRepo.characters$.subscribe((c) => {
        this.characters = c;
        console.log(JSON.stringify(this.characters));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
