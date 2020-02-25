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

    // contain the data retrieved from backend
    data: Array<any>;

    // this is the url params to get the next records (more data)
    showMoreParams: string = null;

    // if the page is trying to load data from backend
    isLoading = false;

    constructor(private devicesService: DevicesService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        console.log('init details page');

        this.activatedRoute.params.subscribe((params: Params) => {
            const deviceName = params['deviceName'];
            const deviceId = params['deviceId'];
            this.deviceInfo = new EnvObserver(deviceId, deviceName);
        });

        this.fetchData();
    }

    fetchData() {
        this.isLoading = true;
        this.devicesService.getDataByDeviceId(this.deviceInfo._id, null).subscribe(resData => {
            this.data = resData.data;
            console.log(resData);

            this.showMoreParams = null;
            if (resData.links !== undefined) {
                if (resData.links.nextPage !== undefined) {
                    this.showMoreParams = resData.links.nextPage.href;
                }
            }

            // console.log(this.data);
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    showMore() {
        if (this.showMoreParams === null) {
            return;
        }

        this.isLoading = true;
        this.devicesService.getDataByDeviceId(this.deviceInfo._id, this.showMoreParams).subscribe(resData => {
            this.data = this.data.concat(resData.data);

            this.showMoreParams = null;
            if (resData.links !== undefined) {
                if (resData.links.nextPage !== undefined) {
                    this.showMoreParams = resData.links.nextPage.href;
                }
            }

            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

}
