import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvObserverData} from '../models/EnvObserverData';
import {API_SERVER} from '../../environments/environment';
import {AuthService} from '../auth.service';
import {isNullOrUndefined} from 'util';
import {Observable, of} from 'rxjs';
import {catchError, switchMap, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DevicesService {
    // static readonly baseUrl = 'http://54.254.164.155/';
    static readonly baseUrl = API_SERVER + '/envobservers';
    static readonly getDataByDeviceId = DevicesService.baseUrl + '/getData';

    constructor(private httpClient: HttpClient, private authService: AuthService) {
    }

    findDeviceById(deviceId: string): Observable<any> {
        const url = `${DevicesService.baseUrl}/${deviceId}`;
        return this.httpClient.get(url);
    }

    /**
     * @param deviceId
     * @param queryParams if supplied, deviceId will be ignored
     */
    getDataByDeviceId(deviceId: string, queryParams: string) {
        let url = DevicesService.baseUrl + '/getData?';
        if (queryParams !== undefined && queryParams !== null) {
            url += queryParams;
        } else {
            url += 'deviceId=' + deviceId;
        }
        console.log(url);
        return this.httpClient.get<any>(url);
    }

    /**
     * Get devices associated with the logged in email
     * @param email
     */
    getAssociatedDevices(): Observable<any> {
        return this.authService.getUserInfo().pipe(take(1), switchMap(userInfo => {
            if (isNullOrUndefined(userInfo)) {
                throw new Error('No user info found for the current logging');
            }

            return this.httpClient.get(DevicesService.baseUrl);
        }));
    }

    updateDeviceName(deviceId: string, deviceName: string): Observable<boolean> {
        const reqBody = {
            deviceId, deviceName
        };

        return this.httpClient.post(DevicesService.baseUrl, reqBody).pipe(take(1), switchMap(resData => {
            return of(true);
        }), catchError(err => {
            return of(false);
        }));
    }

    updateDeviceSettings(deviceId, options): Observable<boolean> {
        const reqBody = {
            deviceId,
            options
        };

        return this.httpClient.post(DevicesService.baseUrl, reqBody).pipe(take(1), switchMap(resData => {
            return of(true);
        }), catchError(err => {
            return of(false);
        }));

        // return this.httpClient.post(DevicesService.baseUrl, reqBody).pipe(take(1), switchMap(resData => {
        //     console.log('resData');
        //     return of(true);
        // }), catchError(err => {
        //     console.log('resData');
        //     return of(false);
        // }));
    }
}
