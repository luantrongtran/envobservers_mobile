import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AddAuthenticationHeaderInterceptorService} from './interceptors/add-authentication-header-interceptor.service';
import {ProfilePopupMenuComponent} from './devices/profile-popup-menu/profile-popup-menu.component';

@NgModule({
  declarations: [AppComponent, ProfilePopupMenuComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: AddAuthenticationHeaderInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
