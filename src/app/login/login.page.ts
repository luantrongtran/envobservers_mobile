import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

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
            this.authService.token = data.token;
            this.router.navigateByUrl('/devices');
        }, errors => {
            this.errors = errors.error.errors;
        });
    }

}
