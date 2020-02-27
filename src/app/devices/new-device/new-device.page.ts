import {Component, OnInit} from '@angular/core';
import {EnvObserverService} from '../env-observer.service';
import {timeout} from 'rxjs/operators';
import {PopupUtilsService} from '../../popup-utils.service';
import {AuthService} from '../../auth.service';
import {error, isNull, isNullOrUndefined} from 'util';

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

    /**
     * Indicate if the EnvObserver has been activated or not. It has been activated, the app should
     * prevent the user to go to step
     */
    isDeviceActivated = false;

    // the EnvObserver device info
    deviceInfo = {
        internet: {
            internetStatus: false
        },
        deviceConfig: {
            deviceId: ''
        }
    };

    step3Errors = [];

    constructor(private envObserverService: EnvObserverService, private popupUtilsService: PopupUtilsService,
                private authService: AuthService) {
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

    /**
     * This is to send activate the Envobserver device
     */
    activateDevice() {
        this.isLoading = true;
        const sub = this.authService.getUserInfo().subscribe(userInfo => {
            if (isNullOrUndefined(userInfo) || isNullOrUndefined(userInfo.userId)) {
                this.popupUtilsService.presentToast('Failed to activate the device');
                this.isLoading = false;
                return;
            }

            this.envObserverService.activateNewDevice(userInfo.userId).subscribe(data => {
                console.log(data);
                if (data.msg) {
                    this.popupUtilsService.presentToast(data.msg);
                }
                this.isLoading = false;
            }, errors => {
                // this.step3Errors.push(errors.msg);
                this.popupUtilsService.presentToast(errors.msg);
                this.isLoading = false;
            });
        });
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
                console.log(errors);
                /**
                 * Note: if error, it doesn't mean it failed to update the new wifi settings, but because the EnvObserver device
                 * disconnected due to the process of updating itself with the new wifi settings. Therefore, need to retry to retrieve
                 * the EnvObserver info again to get the latest Internet status of the EnvObsrver device
                 */

                    // this.popupUtilsService.presentToast(errors.error.msg);

                const getInfoSub = this.envObserverService.getInfo().pipe(timeout(30000)).subscribe(data => {
                        console.log(data);
                        this.deviceInfo = data;
                        if (this.deviceInfo.internet.internetStatus === false) {
                            this.popupUtilsService.presentToast('Failed to setup the wifi, please check wifi name and password');
                        }
                    }, resErrors => {
                        // if error, don't go to step 2
                        console.log(resErrors);
                        this.popupUtilsService.presentToast('Failed to connect to the EnvObserver device');
                    });
                getInfoSub.add(() => {
                    this.isSettingWifi = false;
                });
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

    isActivated(): boolean {
        if (this.deviceInfo) {
            if (isNullOrUndefined(this.deviceInfo.deviceConfig) === false) {
                if (isNullOrUndefined(this.deviceInfo.deviceConfig.deviceId) === false
                    && this.deviceInfo.deviceConfig.deviceId !== '') {
                    return true;
                }
            }
        }
        return false;
    }
}
