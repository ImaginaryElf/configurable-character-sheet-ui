import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameRepository } from '../../repositories/game.repository';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-char-list',
  templateUrl: './char-list.component.html',
  styleUrls: ['./char-list.component.scss'],
})
export class CharListComponent implements OnInit, OnDestroy {
  userId: string | undefined;
  characterList: any[] | undefined;
  subscriptions: Subscription = new Subscription();

  constructor(
    public gameRepo: GameRepository,
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
            .map((c: any) => {
              return { ...c, gameName: g.name };
            })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
