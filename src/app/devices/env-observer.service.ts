import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {timeout} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class EnvObserverService {

    static readonly BASE_API_URL = 'http://192.168.4.1';
    static readonly UPDATE_WIFI_API_URL = EnvObserverService.BASE_API_URL + '/wifi';

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Get information of the EnvObserver device. This will try to access the Access Point created
     * by the device using the default IP Address 192.168.4.1
     */
    getInfo(): Observable<any> {
        return this.httpClient.get<any>(EnvObserverService.BASE_API_URL);
    }

    updateWifi(ssid: string, password: string): Observable<any> {
        const url = EnvObserverService.UPDATE_WIFI_API_URL + '?ssid=' + ssid + '&pass=' + password;
        console.log(url);
        return this.httpClient.get<any>(url);
    }
}