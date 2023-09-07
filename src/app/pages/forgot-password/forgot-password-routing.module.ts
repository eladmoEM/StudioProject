import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
=======

>>>>>>> origin/master
import { ForgotPasswordPage } from './forgot-password.page';

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
    component: ForgotPasswordPage,

  },


];


=======
    component: ForgotPasswordPage
  }
];

>>>>>>> origin/master
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordPageRoutingModule {}
