import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AddAuthenticationHeaderInterceptorService} from './interceptors/add-authentication-header-interceptor.service';
import {ProfilePopupMenuComponent} from './devices/profile-popup-menu/profile-popup-menu.component';
import {IonicStorageModule} from '@ionic/storage';
import {AuthGuardService} from './auth-guard.service';
import {MilltosecondsComponent} from './custominputs/milltoseconds/milltoseconds.component';

@NgModule({
    declarations: [AppComponent, ProfilePopupMenuComponent, MilltosecondsComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: AddAuthenticationHeaderInterceptorService, multi: true},
        AuthGuardService
    ],
    exports: [
        ProfilePopupMenuComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
