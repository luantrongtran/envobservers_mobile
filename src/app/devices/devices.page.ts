import {Component, OnInit} from '@angular/core';
import {DevicesService} from './devices.service';
import {EnvObserver} from '../models/EnvObserver';
import {API_SERVER} from '../../environments/environment';

@Component({
    selector: 'app-devices',
    templateUrl: './devices.page.html',
    styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {
    server: string;

    constructor(private devicesService: DevicesService) {
        this.server = API_SERVER;
    }

    devicesList: EnvObserver[] = [];

    ngOnInit() {
        console.log(this.devicesService);
        this.getRegisteredDevices();
    }

    getRegisteredDevices() {
        const envObs: EnvObserver = new EnvObserver('1', 'device 1');
        this.devicesList.push(envObs);
    }

    getDeviceDetailsById(deviceId: string) {

    }
}
