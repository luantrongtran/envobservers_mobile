import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DetailsPageModule} from './devices/details/details.module';
import {DevicesPageModule} from './devices/devices.module';
import {AuthGuardService} from './auth-guard.service';
import {DevicesPage} from './devices/devices.page';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path: 'devices',
        loadChildren: () => import('./devices/devices.module').then(m => m.DevicesPageModule),
        canLoad: [AuthGuardService]
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
