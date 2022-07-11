import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserInfoComponent,
    AuthButtonComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-ukt61qwl.eu.auth0.com',
      clientId: 'm3LcxZElHmTPKy8zSGn0K8cRlV28XcZk',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
