import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AlertController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    constructor(private authService: AuthService, public toastController: ToastController, private alertController: AlertController,
                private router: Router) {
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
                this.presentToast('New User Created. Please check your email');
                this.router.navigateByUrl('/login');

                this.clearForm();
            }, errors => {
                this.errors = errors.error.errors;
            });
        };

        this.presentAlert('Do you want to create a new user?', success);
    }

    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            position: 'bottom',
            duration: 3000
        });

        console.log(toast);
        toast.present();
    }

    async presentAlert(msg: string, onsuccess) {
        const alert = await this.alertController.create({
            message: msg,
            buttons: [
                {
                    text: 'No'
                },
                {
                    text: 'Yes',
                    handler: onsuccess
                }
            ]
        });

        await alert.present();
    }

    clearForm() {
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.errors = [];
    }
}
