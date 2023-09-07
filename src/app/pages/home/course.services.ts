import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getChildrenCourses(phoneNumber: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/child-courses/${phoneNumber}`);
  }
}
