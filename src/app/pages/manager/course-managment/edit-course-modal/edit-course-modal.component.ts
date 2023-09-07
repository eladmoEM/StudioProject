import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Course } from './course.model';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-course-modal',
  templateUrl: './edit-course-modal.component.html',
})
export class EditCourseModalComponent implements OnChanges { 
  @Input() course!: Course;
  newChildID: number | null = null;
  days = [
    { name: 'ראשון', selected: false },
    { name: 'שני', selected: false },
    { name: 'שלישי', selected: false },
    { name: 'רביעי', selected: false },
    { name: 'חמישי', selected: false },
    { name: 'שישי', selected: false },
    { name: 'שבת', selected: false }
  ];

  startTime: string | null = null;
  endTime: string | null = null; 

  ngOnChanges(changes: SimpleChanges) {
    if(changes['course'] && changes['course'].currentValue) {
        this.days.forEach(day => {
          const foundSchedule = this.course && this.course.schedule ? this.course.schedule.find(s => s.dayOfWeek === day.name) : undefined;
          day.selected = !!foundSchedule;
          if (foundSchedule) {
            this.startTime = foundSchedule.startTime;
            this.endTime = foundSchedule.endTime;
          }
        });
    }
  }

  constructor(private modalController: ModalController, private http: HttpClient, private alertController: AlertController) {}

  saveChanges() {

    const schedulesToSave = this.days.filter(day => day.selected).map(day => ({
      dayOfWeek: day.name,
      startTime: this.startTime,
      endTime: this.endTime
    }));
    
    // POST this data to your backend to save changes
    this.http.post('http://localhost:3000/api/courses/saveChanges', {
      course: this.course,
      schedules: schedulesToSave
    }).subscribe(response => {
      // Handle successful save
      location.reload(); 
    }, error => {
      // Handle error
    });
  }

  
  pauseCourse() {
    this.http.post('http://localhost:3000/api/courses/pause', {
      courseId: this.course.id
    }).subscribe(response => {
      console.log('Course paused');
    }, error => {
      console.error(error);
    });
  }

  resumeCourse() {
    this.http.post('http://localhost:3000/api/courses/resume', {
      courseId: this.course.id
    }).subscribe(response => {
      console.log('Course resumed');
    }, error => {
      console.error(error);
    });
  }


  
  getSelectedDays() {
    return this.days.filter(day => day.selected).map(day => day.name);
  }
  async resetAllDays() {
    const alert = await this.alertController.create({
      header: 'איפוס ימים',
      message: 'אתה בטוח שאתה רוצה לאפס את כל הימים?',
      buttons: [
        {
          text: 'ביטול',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'אישור',
          handler: () => {
            this.days.forEach(day => day.selected = false);
            this.startTime = null;
            this.endTime = null;
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  
  
  
  cancel() {
    this.modalController.dismiss();
  }
}
