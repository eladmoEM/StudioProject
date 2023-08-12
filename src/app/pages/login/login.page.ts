import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  forgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }

  async login() {
    // Check if the email and password are both 'Admin'
    if (this.email.toLowerCase() === 'admin' && this.password === 'Admin') {
      // Navigate to the manager page
      this.router.navigateByUrl('/manager');
    } else {
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
  
        // User has successfully logged in
        console.log(userCredential);
        this.router.navigateByUrl('/home');
      } catch (error) {
        console.log(error);
  
        // Show an error message if login failed
        const alert = await this.alertController.create({
          header: 'שגיאה',
          message: 'אימייל או סיסמה אינם תקינים',
          buttons: ['אישור'],
        });
        await alert.present();
      }
    }
  }
  
}
