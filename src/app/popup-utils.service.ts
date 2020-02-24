import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PopupUtilsService {

    constructor(private loadingController: LoadingController, private toastController: ToastController,
                private alertController: AlertController) {
    }

    async presentLoading(msg: string, duration: number) {
        const loading = await this.loadingController.create({
            message: msg,
            duration
        });
        await loading.present();

        const {role, data} = await loading.onDidDismiss();
        console.log('Loading dismissed!');
        return loading;
    }

    hideLoading() {
        this.loadingController.dismiss();
    }

    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            position: 'middle',
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

    async presentPrompt(header: string, inputs, onSuccess) {
        const alert = await this.alertController.create({
            header,
            inputs,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'medium'
                }, {
                    text: 'Ok',
                    handler: onSuccess
                }
            ]
        });

        await alert.present();
    }
}
