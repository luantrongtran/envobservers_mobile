import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DetailsPageModule} from './devices/details/details.module';
import {DevicesPageModule} from './devices/devices.module';

const routes: Routes = [
    {path: '', redirectTo: 'devices', pathMatch: 'full'},
    {
        path: 'devices',
        // component: DevicesPageModule
        loadChildren: () => import('./devices/devices.module').then(m => m.DevicesPageModule)
        // children: [
        //     {path: 'details', component: DetailsPageModule}
        // ]
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
