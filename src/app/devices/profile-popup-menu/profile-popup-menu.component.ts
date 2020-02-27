import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {ModalController, PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-profile-popup-menu',
    templateUrl: './profile-popup-menu.component.html',
    styleUrls: ['./profile-popup-menu.component.scss'],
})
export class ProfilePopupMenuComponent implements OnInit {

    email = '';

    constructor(private authService: AuthService, private popoverController: PopoverController) {
    }

    ngOnInit() {
        this.authService.userInfo.subscribe(userInfo => {
            if (userInfo !== null) {
                this.email = userInfo.email;
            }
        });
    }

    logout() {
        this.authService.logout();
        this.popoverController.dismiss();
    }
}
