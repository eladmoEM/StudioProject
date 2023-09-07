import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
=======

>>>>>>> origin/master
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

<<<<<<< HEAD
 

  constructor(private route: ActivatedRoute,  private router: Router,) {

  }
=======
  constructor() { }
>>>>>>> origin/master

  ngOnInit() {
  }

<<<<<<< HEAD
  navigateLogin() {
    this.router.navigate(['/login']);

  }
=======
>>>>>>> origin/master
}
