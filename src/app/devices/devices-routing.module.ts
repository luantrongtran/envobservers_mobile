import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DevicesPage} from './devices.page';
import {AuthGuardService} from '../auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: DevicesPage
    },
    {
        path: ':deviceId/:deviceName',
        loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule),
        canLoad: [AuthGuardService]
        // loadChildren: './details/details.module#DetailsPageModule'
    },
    {
        path: 'new-device',
        loadChildren: () => import('./new-device/new-device.module').then(m => m.NewDevicePageModule),
        canLoad: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DevicesPageRoutingModule {
}

