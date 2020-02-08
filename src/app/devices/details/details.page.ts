import {Component, Input, OnInit} from '@angular/core';
import {DevicesService} from '../devices.service';
import {EnvObserver} from '../../models/EnvObserver';
import {ActivatedRoute, Params} from '@angular/router';
import {EnvObserverData} from '../../models/EnvObserverData';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

    deviceInfo: EnvObserver;

    data: Array<any>;

    showMoreParams: string;

    constructor(private devicesService: DevicesService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        console.log('init details page');

        this.activatedRoute.params.subscribe((params: Params) => {
            let deviceName = params['deviceName'];
            let deviceId = params['deviceId'];
            this.deviceInfo = new EnvObserver(deviceId, deviceName);
        });

        this.fetchData();
    }

    fetchData() {
        this.devicesService.getDataByDeviceId(this.deviceInfo.deviceId, null).subscribe(resData => {
            this.data = resData.data;

            this.showMoreParams = null;
            if (resData.links !== undefined) {
                if (resData.links.nextPage !== undefined) {
                    this.showMoreParams = resData.links.nextPage.href;
                }
            }

            console.log(this.data);
        }, error => {
            console.log(error);
        });
    }

    showMore() {
        if (this.showMoreParams === null) {
            return;
        }
        this.devicesService.getDataByDeviceId(this.deviceInfo.deviceId, this.showMoreParams).subscribe(resData => {
            this.data = this.data.concat(resData.data);

            this.showMoreParams = null;
            if (resData.links !== undefined) {
                if (resData.links.nextPage !== undefined) {
                    this.showMoreParams = resData.links.nextPage.href;
                }
            }
        }, error => {
            console.log(error);
        });
    }
}
