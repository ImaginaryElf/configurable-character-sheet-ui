import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameRepository } from '../../repositories/game.repository';

@Component({
  selector: 'app-char-list',
  templateUrl: './char-list.component.html',
  styleUrls: ['./char-list.component.scss'],
})
export class CharListComponent implements OnInit, OnDestroy {
  characterList: any[] | undefined;
  subscriptions: Subscription = new Subscription();

  constructor(private gameRepo: GameRepository) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.gameRepo.characterList$.subscribe((cl) => {
        this.characterList = cl;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
