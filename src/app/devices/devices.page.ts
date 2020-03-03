import {Component, OnInit} from '@angular/core';
import {DevicesService} from './devices.service';
import {EnvObserver} from '../models/EnvObserver';
import {API_SERVER} from '../../environments/environment';
import {AuthService} from '../auth.service';
import {PopoverController} from '@ionic/angular';
import {ProfilePopupMenuComponent} from './profile-popup-menu/profile-popup-menu.component';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-devices',
    templateUrl: './devices.page.html',
    styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {
    server: string;

    constructor(private devicesService: DevicesService, private authService: AuthService, private popOverController: PopoverController) {
        this.server = API_SERVER;
    }

    devicesList: EnvObserver[] = [];

    ngOnInit() {
        console.log('onIinit');
        this.fetchDevices();
    }

    fetchDevices() {
        const observable = this.devicesService.getAssociatedDevices().pipe(take(1)).subscribe(data => {
            this.devicesList = data;
        }, errors => {
            console.log(errors);
        });
    }

    getDeviceDetailsById(deviceId: string) {

    }

    presentPopover(ev: any) {
        this.popOverController.create({
            component: ProfilePopupMenuComponent,
            event: ev,
            translucent: true
        }).then(loadingEle => {
            loadingEle.present();
        });
    }
}
