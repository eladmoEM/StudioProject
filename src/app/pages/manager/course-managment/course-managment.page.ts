import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { EditCourseModalComponent } from './edit-course-modal/edit-course-modal.component';
import { Course, APIFetchedCourse } from './edit-course-modal/course.model';
import { AddCourseModalComponent } from './add-course-modal/add-course-modal.component';




@Component({
  selector: 'app-course-managment',
  templateUrl: './course-managment.page.html',
  styleUrls: ['./course-managment.page.scss'],
})
export class CourseManagmentPage implements OnInit {
  courses: APIFetchedCourse[] = [];
  consolidatedCourses: Course[] = [];
  private readonly apiEndpoint = 'http://localhost:3000/api/courses/edit';

  constructor(
    private router: Router,
    private modalController: ModalController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<APIFetchedCourse[]>(this.apiEndpoint).subscribe((results) => {
      const courseMap = new Map<string, Course>();
      results.forEach(course => {
        console.log('Processing course:', course);
        if (courseMap.has(course.courseType)) {
          const existingCourse = courseMap.get(course.courseType);
          if (existingCourse) {
            if (!existingCourse.childIDs.includes(course.childID)) {
              existingCourse.childIDs.push(course.childID);
            }
         
    
            if (course.dayOfWeek && (course.startTime || course.endTime)) {
              const scheduleExists = existingCourse.schedule.some(sch => sch.dayOfWeek === course.dayOfWeek && sch.startTime === course.startTime && sch.endTime === course.endTime);
              if (!scheduleExists) {
                existingCourse.schedule.push({
                  dayOfWeek: course.dayOfWeek,
                  startTime: course.startTime || '',
                  endTime: course.endTime || ''
                });
              }
            }
          }
        } else {
          const newCourse: Course = {
            courseType: course.courseType,
            id: course.id,
            teachers: course.teachers,
            childIDs: [],
            schedule: []
          };
          if (course.childID) {
            newCourse.childIDs.push(course.childID);
          }
      
          if (course.dayOfWeek && (course.startTime || course.endTime)) {
            newCourse.schedule.push({
              dayOfWeek: course.dayOfWeek,
              startTime: course.startTime || '', 
              endTime: course.endTime || ''     
            });
          }
      
          courseMap.set(course.courseType, newCourse);
        }
      });
      
      

      this.consolidatedCourses = Array.from(courseMap.values());
      this.consolidatedCourses.forEach(course => {
        course.childIDs = course.childIDs.filter(childID => childID !== null);
      });
      
    }, error => {
      console.error('Error fetching courses:', error);
    });
  }


  goBack() {
    this.router.navigateByUrl('/manager');
  }

  async openAddCourseModal() {
    const modal = await this.modalController.create({
      component: AddCourseModalComponent 
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.addCourse(result.data); 
      }
    });
  
    return await modal.present();
  }
  
  addCourse(newCourse: Course) {

    this.http.post(this.apiEndpoint + '/add', newCourse).subscribe(
      (response) => {
        console.log('Course added:', response);
      
      },
      (error) => {
        console.error('Error adding course:', error);
      }
    );
  }
  
  

  async openModal(course: Course) {
    const modal = await this.modalController.create({
      component: EditCourseModalComponent,
      componentProps: { course: { ...course } },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.updateCourse(result.data);
      }
    });

    return await modal.present();
  }

  updateCourse(updatedCourse: Course) {
    // Code to update the course in your client and server
    // You might call an API endpoint here to update the course in the database
  }
}
