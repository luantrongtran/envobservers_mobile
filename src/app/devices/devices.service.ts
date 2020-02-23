import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvObserverData} from '../models/EnvObserverData';
import {API_SERVER} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DevicesService {
    // static readonly baseUrl = 'http://54.254.164.155/';
    static readonly baseUrl = API_SERVER + '/envobservers';
    static readonly getDataByDeviceId = DevicesService.baseUrl + '/getData';

    constructor(private httpClient: HttpClient) {
    }

    /**
     * @param deviceId
     * @param queryParams if supplied, deviceId will be ignored
     */
    getDataByDeviceId(deviceId: string, queryParams: string) {
        let url = DevicesService.baseUrl + 'envobservers/getData?';
        if (queryParams !== undefined && queryParams !== null) {
            url += queryParams;
        } else {
            url += 'deviceId=' + deviceId;
        }
        console.log(url);
        return this.httpClient.get<any>(url);
    }

    getDevices(email: string) {
        this.httpClient.get('');
    }
}
