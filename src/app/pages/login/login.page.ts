<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';

=======
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
>>>>>>> origin/master

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
<<<<<<< HEAD
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private http: HttpClient
  ) {}

  ngOnInit() {}
=======
  phoneNumber: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
  }
>>>>>>> origin/master

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  forgotPassword() {
<<<<<<< HEAD
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
=======
    // Navigate to the 'forgot password' page
    this.router.navigateByUrl('/forgot-password');
  }


  async login() {
    const formData = {
      phoneNumber: this.phoneNumber,
      password: this.password
    };

    this.http.post('http://localhost:3000/api/login', formData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/home');
      },
      async (error) => {
        console.log(error);

        // Show an error message, if login failed
        const alert = await this.alertController.create({
          header: 'שגיאה',
          message: 'מספר פלאפון או סיסמא אינם תקינים',
          buttons: ['אישור']
        });
        await alert.present();
      }
    );
  }
}
>>>>>>> origin/master
