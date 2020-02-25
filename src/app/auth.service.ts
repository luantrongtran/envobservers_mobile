import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_SERVER} from '../environments/environment';
import {UserInfo} from './models/UserInfo';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    static readonly baseUrl = API_SERVER + '/users';
    static readonly SIGN_IN_URL = AuthService.baseUrl + '/signin';
    static readonly SIGN_UP_URL = AuthService.baseUrl + '/signup';

    // private $token: string;
    public userInfo = new BehaviorSubject<UserInfo>(null);

    constructor(private httpClient: HttpClient) {
    }

    /**
     * get the user id of the logging in user
     */
    // getUserId(): Observable<string> {
    //     return this.userInfo.asObservable().pipe(map(userInfo => userInfo.userId));
    // }

    getUserInfo(): Observable<UserInfo> {
        return this.userInfo.asObservable();
    }

    getToken(): Observable<string> {
        return this.userInfo.asObservable().pipe(map(userInfo => {
                if (userInfo == null) {
                    return null;
                } else {
                    return userInfo.token;
                }
            }
        ));
    }

    /**
     * Send log request to backend server
     * @param email
     * @param password
     */
    login(email: string, password: string) {
        const body = {
            email,
            password
        };
        return this.httpClient.post<any>(AuthService.SIGN_IN_URL, body);
    }

    signup(email: string, password: string, confirmPassword: string) {
        const body = {
            email,
            password,
            confirmPassword
        };
        return this.httpClient.post<any>(AuthService.SIGN_UP_URL, body);
    }

}
