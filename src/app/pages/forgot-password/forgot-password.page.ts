<<<<<<< HEAD

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../forgot-password/auth.service';
import { AlertController } from '@ionic/angular';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> origin/master

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
<<<<<<< HEAD
  email = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) { }
=======

  constructor() { }
>>>>>>> origin/master

  ngOnInit() {
  }

<<<<<<< HEAD
  goBack() {
    this.router.navigateByUrl('/login');
  }

  async resetPassword() {
    try {
      await this.authService.resetPassword(this.email);
      const alert = await this.alertController.create({
        header: 'איפוס סיסמא',
        message: 'נשלח אליך דוא"ל עם הוראות לאיפוס הסיסמא שלך.',
        buttons: ['אישור']
      });

      await alert.present();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Error in reset password:', error);
    }
  }
}
=======
}
>>>>>>> origin/master
