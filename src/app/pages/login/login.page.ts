import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phoneNumber: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  forgotPassword() {
    // Navigate to the 'forgot password' page
    this.router.navigateByUrl('/forgot-password');
  }


  async login() {
    const formData = {
      phoneNumber: this.phoneNumber,
      password: this.password
    };
  
    if (formData.phoneNumber === 'Admin' && formData.password === 'admin') {
      this.router.navigateByUrl('/manager');
      return; // Exit the method early if the admin logs in
    }
  
    this.http.post('http://localhost:3000/api/login', formData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/home');
      },
      async (error) => {
        console.log(error);
  
        // Show an error message if login failed
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
