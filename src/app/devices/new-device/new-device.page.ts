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
    readonly timeoutMillis = 20000;

    // 3 steps to setup a new device
    isStep1 = true;
    isStep2 = false;
    isStep3 = false;

    // the between step loading
    isLoading = false;

    // This indicate if the wifi setup process is being happening
    isSettingWifi = false;

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
        this.isLoading = true;
        /*
         Try to access the EnvObserver device wifi
         */
        const sub = this.envObserverService.getInfo().pipe(timeout(this.timeoutMillis)).subscribe(data => {
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
        // tear down when subscription done
        sub.add(() => {
            this.isLoading = false;
        });
    }

    goToStep3() {
        this.isStep1 = false;
        this.isStep2 = false;
        this.isStep3 = true;
    }

    showWifiPrompt() {
        const onSuccess = (inputData) => {
            this.isSettingWifi = true;

            // console.log(data);
            this.envObserverService.updateWifi(inputData.ssid.trim(), inputData.pass.trim()).subscribe(resData => {
                this.envObserverService.getInfo().pipe(timeout(this.timeoutMillis)).subscribe(data => {
                    console.log(data);
                    this.deviceInfo = data;
                }, errors => {
                    // if error, don't go to step 2
                    console.log(errors);
                    this.popupUtilsService.presentToast('Failed to connect to the EnvObserver device');
                });

                this.isSettingWifi = false;
            }, errors => {

                /**
                 * Note: if error, it doesn't mean it failed to update the new wifi settings, but because the EnvObserver device
                 * disconnected due to the process of updating itself with the new wifi settings. Therefore, need to retry to retrieve
                 * the EnvObserver info again to get the latest Internet status of the EnvObsrver device
                 */

                // this.popupUtilsService.presentToast(errors.error.msg);

                const getInfoSub = this.envObserverService.getInfo().pipe(timeout(30000)).subscribe(data => {
                    console.log(data);
                    this.deviceInfo = data;
                }, resErrors => {
                    // if error, don't go to step 2
                    console.log(resErrors);
                    this.popupUtilsService.presentToast('Failed to connect to the EnvObserver device');
                });
                getInfoSub.add(()=>{
                    this.isSettingWifi = false;
                })
            });
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
}
