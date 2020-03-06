import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {EnvObserver} from '../../models/EnvObserver';
import {DevicesService} from '../devices.service';
import {PopupUtilsService} from '../../popup-utils.service';
import {MilltosecondsComponent} from '../../custominputs/milltoseconds/milltoseconds.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    deviceInfo: EnvObserver;

    pageTitle;

    isNamedChangeEnabled = false;

    deviceName = '';

    newDeviceInfo: EnvObserver;

    constructor(private devicesService: DevicesService, private popupUtilsService: PopupUtilsService,
                private activatedRoute: ActivatedRoute) {
    }

    /**
     * fetch the latest config from the server
     */
    fetchLatestDeviceInfo() {
        this.devicesService.findDeviceById(this.deviceInfo._id).subscribe(resData => {
            if (resData) {
                console.log();
                const options = JSON.parse(resData.options);
                this.deviceInfo = resData;
                this.deviceInfo.options = options;
                this.newDeviceInfo = this.deviceInfo;

                console.log(this.deviceInfo);
            }
        }, errors => {
            this.popupUtilsService.presentToast('Failed to download the latest config');
        });
    }

    ngOnInit() {
        this.activatedRoute.params.pipe(take(1)).subscribe((params: Params) => {
            const deviceName = params['deviceName'];
            const deviceId = params['deviceId'];
            this.deviceInfo = new EnvObserver(deviceId, deviceName);
            this.newDeviceInfo = new EnvObserver(deviceId, deviceName);

            this.pageTitle = deviceName;
            this.deviceName = deviceName;
        });

        this.fetchLatestDeviceInfo();
    }

    saveName() {
        if (!this.deviceName) {
            this.popupUtilsService.presentToast('Device name cannot be empty');
        }

        this.devicesService.updateDeviceName(this.deviceInfo._id, this.deviceName).subscribe(isSuccessful => {
            if (isSuccessful) {
                this.popupUtilsService.presentToast('Device name has been updated');
                this.isNamedChangeEnabled = false;

                this.deviceInfo.name = this.deviceName;
            } else {
                this.popupUtilsService.presentToast('Failed to update device name');

                // this.deviceName = this.deviceInfo.name;
                this.isNamedChangeEnabled = false;
            }
        });
    }

    saveSettings() {
        if (!this.newDeviceInfo.options) {
            return;
        }

        this.devicesService.updateDeviceSettings(this.newDeviceInfo._id, this.newDeviceInfo.options).subscribe(isSuccessful => {
            console.log(isSuccessful);
            if (isSuccessful) {
                this.popupUtilsService.presentToast('Settings has been updated');
                this.deviceInfo.options = this.newDeviceInfo.options;
            } else {
                this.popupUtilsService.presentToast('Failed to update device name');
            }
        });
    }

    enableNameChanging() {
        this.isNamedChangeEnabled = true;
    }

    cancelSaveName() {
        this.deviceName = this.deviceInfo.name;
        this.isNamedChangeEnabled = false;
    }
}
