import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {UserInfo} from '../models/UserInfo';
import {DEBUG_MODE} from '../../environments/environment';
import {take} from 'rxjs/operators';
import {PopupUtilsService} from '../popup-utils.service';

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

    constructor(private authService: AuthService, private router: Router, private popupUtilsService: PopupUtilsService) {
    }

    ngOnInit() {
        if (DEBUG_MODE) {
            this.email = 'test@email.com';
            this.password = '123456';
        }

        this.authService.isAuthenticated().pipe(take(1)).subscribe(isAuthenticated => {
            if (!isAuthenticated) {
                this.authService.reLogIn().subscribe(isReLoggedInSuccessful => {
                    this.popupUtilsService.presentToast(`${isAuthenticated}`);
                    if (isReLoggedInSuccessful) {
                        this.router.navigateByUrl('/devices');
                    }
                });
            }
        });
    }

    signIn() {
        this.isLoading = true;
        const sub = this.authService.login(this.email, this.password).subscribe(data => {
            this.router.navigateByUrl('/devices');
        }, errors => {
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
