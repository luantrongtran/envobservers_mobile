import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AlertController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PopupUtilsService} from '../popup-utils.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    constructor(private authService: AuthService, public toastController: ToastController, private alertController: AlertController,
                private router: Router, private popupUtilsService: PopupUtilsService) {
    }

    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    errors: string[] = new Array();

    ngOnInit() {}

    signUp() {

        const success = () => {
            this.authService.signup(this.email, this.password, this.confirmPassword).subscribe(resData => {

                // reset the error array
                this.errors = [];
                this.popupUtilsService.presentToast('New User Created. Please check your email');
                this.router.navigateByUrl('/login');

                this.clearForm();
            }, errors => {
                this.errors = errors.error.errors;
            });
        };

        this.popupUtilsService.presentAlert('Do you want to create a new user?', success);
    }

    clearForm() {
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.errors = [];
    }
}
