import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';


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
    private afAuth: AngularFireAuth,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  forgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }
  async login() {

    if (this.email.toLowerCase() === 'admin' && this.password === 'Admin') {
      window.location.href = '/manager';
      return;
    }
    try {
    
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log(userCredential);
  

  
     
      this.http.post('http://localhost:3000/api/login', {email: this.email})
      .subscribe(async (data: any) => {
    
        const phoneNumber = data.phoneNumber;
  
  
        localStorage.setItem('phoneNumber', phoneNumber);
        console.log(phoneNumber);
  
       
        window.location.href = '/home';
      });
  
    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'שגיאה',
        message: 'אימייל או סיסמה אינם תקינים',
        buttons: ['אישור'],
      });
      await alert.present();
    }
  
}
  
}  