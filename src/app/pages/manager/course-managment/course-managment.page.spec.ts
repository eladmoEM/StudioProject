import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseManagmentPage } from './course-managment.page';

describe('CourseManagmentPage', () => {
  let component: CourseManagmentPage;
  let fixture: ComponentFixture<CourseManagmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CourseManagmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
