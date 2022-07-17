import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { UserComponent } from './user/user.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameComponent } from './game/game.component';
import { CharacterComponent } from './character/character.component';
import { GameListComponent } from './game-list/game-list.component';
import { CharListComponent } from './char-list/char-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserInfoComponent,
    AuthButtonComponent,
    UserComponent,
    GameComponent,
    CharacterComponent,
    GameListComponent,
    CharListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-ukt61qwl.eu.auth0.com',
      clientId: 'm3LcxZElHmTPKy8zSGn0K8cRlV28XcZk',
      redirectUri: window.location.origin,
      audience: 'https://configurable-sheet-api-prod.herokuapp.com/',
      httpInterceptor: {
        allowedList: [
          'https://configurable-sheet-api-prod.herokuapp.com/game',
          'https://configurable-sheet-api-prod.herokuapp.com/player',
          'https://configurable-sheet-api-prod.herokuapp.com/character',
        ],
      },
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
