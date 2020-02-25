import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {decode} from 'punycode';
import {isNullOrUndefined} from 'util';
import {UserInfo} from '../models/UserInfo';
import {DEBUG_MODE} from '../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private email: string;
    private password: string;
    private errors: [];

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        if(DEBUG_MODE) {
            this.email = 'aaa@email.com';
            this.password = '123456';
        }
    }

    signIn() {
        this.authService.login(this.email, this.password).subscribe(data => {
            // decode the token to get the user info
            const decodedToken = jwt_decode(data.token);

            // Saving user info
            let name = '';
            if (isNullOrUndefined(data.name)) {
                name = data.name;
            }
            const userInfo = new UserInfo(decodedToken.user.userId, decodedToken.user.email, decodedToken.user.name,
                data.token);
            console.log(decodedToken);
            console.log(userInfo);

            this.authService.userInfo.next(userInfo);

            // Navigate to the devices page
            this.router.navigateByUrl('/devices');
        }, errors => {
            this.errors = errors.error.errors;
        });
    }

}