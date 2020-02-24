import {Component, OnInit} from '@angular/core';
import {EnvObserverService} from '../env-observer.service';
import {timeout} from 'rxjs/operators';
import {PopupUtilsService} from '../../popup-utils.service';

@Component({
    selector: 'app-new-device',
    templateUrl: './new-device.page.html',
    styleUrls: ['./new-device.page.scss'],
})
export class NewDevicePage implements OnInit {
    readonly timeoutMillis = 10000;

    // 3 steps to setup a new device
    isStep1 = true;
    isStep2 = false;
    isStep3 = false;

    step1Errors = new Array<string>();

    // the EnvObserver device info
    deviceInfo = {
        internet: {
            internetStatus: false
        }
    };

    constructor(private envObserverService: EnvObserverService, private popupUtilsService: PopupUtilsService) {
    }

    ngOnInit() {
        this.goToStep1();
        console.log('onInit');
    }

    goToStep1() {
        this.isStep1 = true;
        this.isStep2 = false;
        this.isStep3 = false;
    }

    goToStep2() {
        // Try to access the EnvObserver device wifi
        // this.popupUtilsService.presentLoading('Connecting to EnvObserver device. Please wait, this may take 1 minute', this.timeoutMillis);
        this.envObserverService.getInfo().pipe(timeout(this.timeoutMillis)).subscribe(data => {
            console.log(data);
            this.deviceInfo = data;
            console.log(this.deviceInfo);

            // go to step 2
            this.isStep1 = false;
            this.isStep2 = true;
            this.isStep3 = false;
        }, errors => {
            // if error, don't go to step 2
            console.log(errors);
            this.popupUtilsService.presentToast('Failed to connect to the EnvObserver device');
        });


    }

    goToStep3() {
        this.isStep1 = false;
        this.isStep2 = false;
        this.isStep3 = true;
    }

    showWifiPrompt() {
        const onSuccess = (inputData) => {
            // console.log(data);
            this.envObserverService.updateWifi(inputData.ssid.trim(), inputData.pass.trim()).subscribe(resData => {
                console.log(resData);
                this.envObserverService.getInfo().pipe(timeout(this.timeoutMillis)).subscribe(data => {
                    console.log(data);
                    this.deviceInfo = data;
                }, errors => {
                    // if error, don't go to step 2
                    console.log(errors);
                    this.popupUtilsService.presentToast('Failed to connect to the EnvObserver device');
                });
            }, errors => {
                console.log(errors);
                this.popupUtilsService.presentToast(errors.error.msg);
            });
        //         .subscribe(resData => {
        //         console.log(resData.data);
        //         this.envObserverService.getInfo().pipe(timeout(this.timeoutMillis)).subscribe(data => {
        //             console.log(data);
        //             this.deviceInfo = data;
        //         }, errors => {
        //             // if error, don't go to step 2
        //             console.log(errors);
        //             this.popupUtilsService.presentToast('Failed to connect to the EnvObserver device');
        //         });
        //     });
        };
        const inputs = [
            {
                name: 'ssid',
                type: 'text',
                placeholder: 'Wifi name',
                id: 'wifiName'
            },
            {
                name: 'pass',
                type: 'password',
                id: 'wifiPass',
                placeholder: 'Password'
            }
        ];
        this.popupUtilsService.presentPrompt('Please input wifi details', inputs, onSuccess);
    }

    updatePassword(data) {
        // console.log(data);
        // this.envObserverService.updateWifi(ssid, pass).subscribe(resData => {
        //     this.envObserverService.getInfo().pipe(timeout(this.timeoutMillis)).subscribe(data => {
        //         this.deviceInfo = data;
        //         this.popupUtilsService.hideLoading();
        //     }, errors => {
        //         // if error, don't go to step 2
        //         console.log(errors);
        //         this.popupUtilsService.presentToast('Failed to connect to the EnvObserver device');
        //     });
        // });
    }
}
