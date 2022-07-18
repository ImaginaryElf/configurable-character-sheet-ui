import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameRepository } from '../../repositories/game.repository';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game';
import { Subscription } from 'rxjs';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  game: Game | undefined;
  subscriptions: Subscription = new Subscription();

  constructor(
    private gameRepo: GameRepository,
    private activatedRoute: ActivatedRoute,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe((params: any) => {
        this.apiClientService.getGameById(params.get('id')).subscribe();
      })
    );
    this.subscriptions.add(
      this.gameRepo.game$.subscribe((game) => {
        this.game = game;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
