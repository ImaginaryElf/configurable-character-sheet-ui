import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameRepository } from '../../repositories/game.repository';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit, OnDestroy {
  character: any;
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
        this.apiClientService.getCharacterById(params.get('id')).subscribe();
        this.apiClientService.getGamesByCharacter(params.get('id')).subscribe();
      })
    );
    this.subscriptions.add(
      this.gameRepo.character$.subscribe((char) => {
        this.character = char;
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
