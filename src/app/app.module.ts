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
import { MatTabsModule } from '@angular/material/tabs';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { NullInputComponent } from './components/null-input/null-input.component';
import { ListInputComponent } from './components/list-input/list-input.component';
import { TableInputComponent } from './components/table-input/table-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { BoolInputComponent } from './components/bool-input/bool-input.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    TextInputComponent,
    NumberInputComponent,
    NullInputComponent,
    ListInputComponent,
    TableInputComponent,
    BoolInputComponent,
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
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CdkTableModule,
    MatCheckboxModule,
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
