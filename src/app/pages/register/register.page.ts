import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CheckboxCustomEvent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
<<<<<<< HEAD
import { AngularFireAuth } from '@angular/fire/compat/auth';


=======
>>>>>>> origin/master

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  @ViewChild('registrationForm', { static: false })
  registrationForm!: NgForm;
  parentNames: string = '';
<<<<<<< HEAD
  email: string = '';
  password: string = '';
  cpassword: string = '';
=======
  username: string = '';
  password: string = '';
  cpassword: string = '';
  email: string = '';
>>>>>>> origin/master
  phoneNumber: string = '';
  numberOfChildren: number = 0;
  children: any[] = [];
  childinfo: any[] = [];
  childName: string = '';
  courseType: string = '';
  childID: string = '';
  birthdate = new Date().toISOString();
  gender: string = '';
  disableSelector1 = false;
  disableSelector2 = false;
  disableSelector3 = false;
  disableSelector4 = false;
  canDismiss = false;
  presentingElement: Element | null = null;
  isContinueButtonVisible = false;
  isContinueButtonNoNVisible = true;
<<<<<<< HEAD
  courses: any[] = [];
  totalSum: number = 0;

  
=======
  
  

  

>>>>>>> origin/master
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private navCtrl: NavController,
    private modalController: ModalController,
<<<<<<< HEAD
    private afAuth: AngularFireAuth
  ) {}

  removeDuplicateCourses(courses: any[]): any[] {
    return Array.from(new Set(courses.map(a => a.courseType)))
      .map(courseType => {
        return courses.find(a => a.courseType === courseType);
      });
  }


  ngOnInit() {
    this.http.get('http://localhost:3000/api/courses').subscribe((response: any) => {
      this.courses = response;
    });
    this.presentingElement = document.querySelector('.ion-page');
    
  }

  goBack() {
    this.router.navigate(['/login', { totalSum: this.totalSum }]);
=======
  ) {}

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  goToLoginPage() {
    this.navCtrl.navigateForward('/login');
>>>>>>> origin/master
  }

  onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss = ev.detail.checked;
  }

  dismissModal() {
    this.isContinueButtonVisible = true;
    this.isContinueButtonNoNVisible = false;
    this.modalController.dismiss();
  }

<<<<<<< HEAD
  async onClick() {
    if (!this.phoneNumber || !this.parentNames || !this.email || !this.password || !this.cpassword || !this.numberOfChildren) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please fill all the required fields.',
        buttons: ['OK'],
=======


  async onClick() {
    
    if (this.registrationForm.valid) {
      // The form is valid, so you can submit it to the server or do other actions
    } else {
      // The form is invalid, so display an error message to the user
      const alert = await this.alertController.create({
        header: 'שגיאה',
        message: 'בבקשה מלא את כל הפרטים',
        buttons: ['אישור']
>>>>>>> origin/master
      });
      await alert.present();
      return;
    }
  
<<<<<<< HEAD
    if (this.registrationForm.valid && this.phoneNumber !== null) {
      if (this.password !== this.cpassword) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Passwords do not match.',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
  
    
      const formData = {
        parentNames: this.parentNames,
        email: this.email,
        password: this.password,
        cpassword: this.cpassword,
=======

    // Check if password and confirm password match
    if (this.password !== this.cpassword) {
      const alert = await this.alertController.create({
        header: 'שגיאה',
        message: 'סיסמאות לא תואמות.',
        buttons: ['אישור'],
      });
      await alert.present();
      return;
    }

 
      const formData = {
        parentNames: this.parentNames,
        username: this.username,
        password: this.password,
        cpassword: this.cpassword,
        email: this.email,
>>>>>>> origin/master
        phoneNumber: this.phoneNumber,
        numberOfChildren: this.numberOfChildren,
        children: this.children.map(child => ({
          childID: child.childID,
          childName: child.childName,
          birthdate: child.birthdate,
          disableSelector1: child.disableSelector1,
          disableSelector2: child.disableSelector2,
          disableSelector3: child.disableSelector3,
          disableSelector4: child.disableSelector4,
          gender: child.gender,
<<<<<<< HEAD
          courseType: child.courseType,
        }))
      };
  
      try {
        // Register user in Firebase
        await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
        
        
        try {
          await this.http.post('http://localhost:3000/api/register', formData).toPromise();
          const alert = await this.alertController.create({
            header: 'הצלחה',
            message: 'נרשמתם בהצלחה לאפליקציה',
            buttons: ['אישור'],
          });
          await alert.present();
          alert.onDidDismiss().then(() => {
            this.router.navigate(['/payment', { totalSum: this.totalSum }]);
          });
          
          
        } catch (error) {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'An error occurred. Please try again later.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      } catch (error) {
        if (error instanceof Error) { 
          const alert = await this.alertController.create({
            header: 'Error',
            message: error.message,
            buttons: ['OK'],
          });
          await alert.present();
        } else {  
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'An unknown error occurred',
            buttons: ['OK'],
          });
          await alert.present();
        }
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please fill all the required fields.',
        buttons: ['OK'],
      });
      await alert.present();
    }
    
=======
          courseType: child.courseType
        }))
      };

      
 
  
      //post for Database
    this.http.post('http://localhost:3000/api/register', formData)
      .subscribe((response: any) => {
        console.log(response);
        const alert = this.alertController.create({
          header: 'Success!',
          message: 'User registered successfully!',
          buttons: ['OK']
        });
        alert.then((res) => {
          res.present();
          this.router.navigate(['/payment']);
        });
      }, (error: any) => {
        console.log(error);
        const alert = this.alertController.create({
          header: 'Error',
          message: 'An error occurred. Please try again later.',
          buttons: ['OK']
        });
        alert.then((res) => {
          res.present();
        });
      });

>>>>>>> origin/master
  }
  
  //This method adding more details for each child
  onNumberOfChildrenChange() {
    if (this.numberOfChildren <= 0) {
      this.children = [];
      return;
    }
    const diff = this.numberOfChildren - this.children.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.children.push({ 
          childName: '', 
          childID: '', 
<<<<<<< HEAD
          birthdate: new Date().toISOString(),
          gender: '', 
          courseType: '',
          availableCourses: []
=======
          birthdate: new Date(),
          gender: '', 
          courseType: ''
>>>>>>> origin/master
        });
      }
    } else if (diff < 0) {
      this.children = this.children.slice(0, this.numberOfChildren);
    }
  }
<<<<<<< HEAD

  getMaxDateForChildren() {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 17); 
    return currentDate.toISOString().split('T')[0];
  }

  getMinDateForChildren() {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 6); 
    return currentDate.toISOString().split('T')[0];
  }



ionChanger() {
  
  const currentYear = new Date().getFullYear();
  
  this.children.forEach((child) => {
    const birthdate = new Date(child.birthdate).getFullYear();
    const age = currentYear - birthdate;

    const availableCourses = this.courses.filter(course => {
      return age >= course.min_age && age <= course.max_age;
    });

    child.availableCourses = this.removeDuplicateCourses(availableCourses);

  });

}

  trackByCourse(index: number, course: any): string {
    return course.courseType;
=======
  //This method sorting to courses by age
  ionChanger() {
    const year = new Date().getFullYear();
    this.children.forEach(child => {
      const birthdate = new Date(child.birthdate).getFullYear();
      const age = year - birthdate;
  
      if (age >= 6 && age <= 9) {
        child.disableSelector2 = true;
        child.disableSelector4 = true;
        child.disableSelector1 = false;
        child.disableSelector3 = false;
      } else if (age >= 9 && age <= 17) {
        child.disableSelector1 = true;
        child.disableSelector3 = true;
        child.disableSelector2 = false;
        child.disableSelector4 = false;
      } else {
        child.disableSelector1 = false;
        child.disableSelector2 = false;
        child.disableSelector3 = false;
        child.disableSelector4 = false;
      }
    });
>>>>>>> origin/master
  }
}