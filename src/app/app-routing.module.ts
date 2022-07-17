import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { GameComponent } from './game/game.component';
import { CharacterComponent } from './character/character.component';
import { GameListComponent } from './game-list/game-list.component';
import { CharListComponent } from './char-list/char-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'games', component: GameListComponent, canActivate: [AuthGuard] },
  { path: 'game/:id', component: GameComponent, canActivate: [AuthGuard] },
  {
    path: 'characters/:uid',
    component: CharListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'character/:id',
    component: CharacterComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
