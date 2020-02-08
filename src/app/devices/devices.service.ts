import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvObserverData} from '../models/EnvObserverData';

@Injectable({
    providedIn: 'root'
})
export class DevicesService {
    static readonly baseUrl = 'http://localhost:3000/';

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
        return this.httpClient.get(url);
    }
}
