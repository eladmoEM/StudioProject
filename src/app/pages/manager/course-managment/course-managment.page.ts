import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Create an interface to define the course object with only the 'title' property
interface Course {
  title: string;
}

@Component({
  selector: 'app-course-managment',
  templateUrl: './course-managment.page.html',
  styleUrls: ['./course-managment.page.scss'],
})
export class CourseManagmentPage implements OnInit {
  courses: Course[] = [
    { title: 'בלט בוגרים' },
    { title: 'בלט צעירים' },
    { title: 'היפהופ בוגרים' },
    { title: 'היפהופ צעירים' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl('/manager');
  }
}
