import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseManagmentPage } from './course-managment.page';

const routes: Routes = [
  {
    path: '',
    component: CourseManagmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseManagmentPageRoutingModule {}
