import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicesPage } from './devices.page';

const routes: Routes = [
  {
    path: '',
    component: DevicesPage
  },
  {
    path: ':deviceId/:deviceName',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
    // loadChildren: './details/details.module#DetailsPageModule'
  },
  {
    path: 'new-device',
    loadChildren: () => import('./new-device/new-device.module').then( m => m.NewDevicePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevicesPageRoutingModule {}

