import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvObserverData} from '../models/EnvObserverData';
import {API_SERVER} from '../../environments/environment';
import {AuthService} from '../auth.service';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DevicesService {
    // static readonly baseUrl = 'http://54.254.164.155/';
    static readonly baseUrl = API_SERVER + '/envobservers';
    static readonly getDataByDeviceId = DevicesService.baseUrl + '/getData';

    constructor(private httpClient: HttpClient, private authService: AuthService) {
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

            // const httpOptions = {
            //     headers: new HttpHeaders({
            //         'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            //         token: userInfo.token
            //     })
            // };
            return this.httpClient.get(DevicesService.baseUrl);
        }));

        // return this.authService.getUserId().pipe(take(1), switchMap(userInfo => {
        //     const httpOptions = {
        //         // headers: new HttpHeaders({
        //         //     token: userInfo.token
        //         // })
        //     };
        //     return this.httpClient.get(DevicesService.baseUrl, httpOptions);
        // }));

        //     .subscribe(userId => {
        //     if (isNullOrUndefined(userId)) {
        //         throw new Error('No userId found in logged user\'s info)';
        //     }
        //
        //     const httpOptions = {
        //         headers: new HttpHeaders({
        //             token: this.authService.token
        //         })
        //     };
        //     return this.httpClient.get(DevicesService.baseUrl, httpOptions);
        // });

        // let userInfo = this.authService.userInfo;
        // if (isNullOrUndefined(userInfo) === true) {
        //     return null;
        // } else if (isNullOrUndefined(userInfo.email) || userInfo.email === '') {
        //     return null;
        // }
        //
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         token: this.authService.token
        //     })
        // };
        // return this.httpClient.get(DevicesService.baseUrl, httpOptions);
    }
}
