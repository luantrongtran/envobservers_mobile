import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_SERVER} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    static readonly baseUrl = API_SERVER + '/users';
    static readonly SIGN_IN_URL = AuthService.baseUrl + '/signin';
    static readonly SIGN_UP_URL = AuthService.baseUrl + '/signup';

    private $token: string;

    get token() {
        return this.$token;
    }

    set token(str: string) {
        this.$token = str;
    }

    constructor(private httpClient: HttpClient) {
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
