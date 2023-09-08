import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CheckboxCustomEvent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  @ViewChild('registrationForm', { static: false })
  registrationForm!: NgForm;
  parentNames: string = '';
  email: string = '';
  password: string = '';
  cpassword: string = '';
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
  courses: any[] = [];
  totalSum: number = 0;

  
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private navCtrl: NavController,
    private modalController: ModalController,
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
    this.router.navigate(['/login']);
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

  async onClick() {
    if (!this.phoneNumber || !this.parentNames || !this.email || !this.password || !this.cpassword || !this.numberOfChildren) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please fill all the required fields.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
  
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
          birthdate: new Date().toISOString(),
          gender: '', 
          courseType: '',
          availableCourses: []
        });
      }
    } else if (diff < 0) {
      this.children = this.children.slice(0, this.numberOfChildren);
    }
  }

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
  }
}