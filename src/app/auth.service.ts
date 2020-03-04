import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_SERVER} from '../environments/environment';
import {UserInfo} from './models/UserInfo';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import * as jwt_decode from 'jwt-decode';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    static readonly baseUrl = API_SERVER + '/users';
    static readonly SIGN_IN_URL = AuthService.baseUrl + '/signin';
    static readonly SIGN_UP_URL = AuthService.baseUrl + '/signup';

    // private $token: string;
    public userInfo = new BehaviorSubject<UserInfo>(null);

    constructor(private httpClient: HttpClient, private router: Router, private storage: Storage) {
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
     * This is to restore authentication data in storage. This can be used if the app is re-opened, but
     * the user is not yet logged out
     */
    reLogIn() {
        return from(this.storage.get('authData')).pipe(take(1), map(data => {
            if (data) {
                const userInfo = JSON.parse(data);
                const objUserInfo = new UserInfo(userInfo.userId, userInfo.email, userInfo.name, userInfo.$token);

                return objUserInfo;
            }

            return null;
        }), tap(userInfo => {
            this.userInfo.next(userInfo);
        }), map(userInfo => {
            return !!userInfo;
        }));
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
        return this.httpClient.post<any>(AuthService.SIGN_IN_URL, body).pipe(tap(data => {
            // decode the token to get the user info
            const decodedToken = jwt_decode(data.token);

            // Saving user info
            let name = '';
            if (isNullOrUndefined(data.name)) {
                name = data.name;
            }

            this.setAuthData(decodedToken.user.userId, data.email, name,
                data.token);
        }));
    }

    signup(email: string, password: string, confirmPassword: string) {
        const body = {
            email,
            password,
            confirmPassword
        };
        return this.httpClient.post<any>(AuthService.SIGN_UP_URL, body);
    }

    logout() {
        this.storage.remove('authData');
        this.userInfo.next(null);
        this.router.navigateByUrl('/login');
    }

    setAuthData(userId: string, email: string, name: string, token: string): void {
        const userInfo = new UserInfo(userId, email, name,
            token);
        this.userInfo.next(userInfo);

        // persist the data
        this.storage.set('authData', JSON.stringify(userInfo));
    }

    isAuthenticated() {
        return this.userInfo.asObservable().pipe(take(1), map(userInfo => {
            if (userInfo) {
                return !!userInfo.token;
            } else {
                return false;
            }
        }));
    }
}
