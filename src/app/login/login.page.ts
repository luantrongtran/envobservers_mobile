import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {UserInfo} from '../models/UserInfo';
import {DEBUG_MODE} from '../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    email: string;
    password: string;
    errors: [];

    isLoading = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        if (DEBUG_MODE) {
            this.email = 'test@email.com';
            this.password = '123456';
        }
    }

    signIn() {
        this.isLoading = true;
        const sub = this.authService.login(this.email, this.password).subscribe(data => {
            this.router.navigateByUrl('/devices');
        }, errors => {
            console.log(errors);
            if (errors.error && errors.error.errors) {
                this.errors = errors.error.errors;
            }
        });
        // finally
        sub.add(() => {
            this.isLoading = false;
        });
    }

    persistAuthDate() {

    }

}
