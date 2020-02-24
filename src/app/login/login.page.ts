import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {decode} from 'punycode';

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
    }

    signIn() {
        this.authService.login(this.email, this.password).subscribe(data => {
            // save the token
            this.authService.token = data.token;



            // decode the token to get the user info
            let decodedToken = jwt_decode(data.token);

            // Saving user info
            this.authService.userInfo = {
                userId: decodedToken.user.userId,
                email: this.email,
                name: ''
            };
            console.log(this.authService.userInfo);

            // Navigate to the devices page
            this.router.navigateByUrl('/devices');
        }, errors => {
            this.errors = errors.error.errors;
        });
    }

}
