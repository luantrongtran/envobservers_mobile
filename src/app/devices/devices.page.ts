import {Component, OnInit} from '@angular/core';
import {DevicesService} from './devices.service';
import {EnvObserver} from '../models/EnvObserver';

@Component({
    selector: 'app-devices',
    templateUrl: './devices.page.html',
    styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {

    constructor(private devicesService: DevicesService) {
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
