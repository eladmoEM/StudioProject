import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController  } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-course-modal',
  templateUrl: './add-course-modal.component.html',
  styleUrls: ['./add-course-modal.component.scss'],
})
export class AddCourseModalComponent implements OnInit {
  courseType: string = '';
  teachers: string = '';
  childID: string = '';
  min_age: number | null = null;
  max_age: number | null = null;
  money: number | null = null; 
 

  constructor(private modalController: ModalController, private http: HttpClient, private alertController: AlertController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true,
      'courseType': this.courseType,
      'teachers': this.teachers
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'שגיאה',
      message: 'חובה למלא את כל הפרטים',
      buttons: ['אישור']
    });

    await alert.present();
  }

  addCourse() {
    if (!this.courseType.trim() || !this.teachers.trim() || !this.min_age || !this.max_age || !this.money) {
      this.presentAlert();
      return;
    }
    const data = {
      courseType: this.courseType,
      teachers: this.teachers,
      childID: this.childID,
      min_age: this.min_age,
      max_age: this.max_age,
      money: this.money
    };
    
    this.http.post('http://localhost:3000/api/courses/add', data).subscribe(response => {
      console.log('Course added successfully:', response);
      this.dismissModal();
      window.location.href = '/manager/course-managment';
    }, error => {
      console.error('Error adding course:', error);
    });
  }
}
