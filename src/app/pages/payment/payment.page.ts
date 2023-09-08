import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

 

  constructor(private route: ActivatedRoute,  private router: Router,) {

  }

  ngOnInit() {
  }

  navigateLogin() {
    this.router.navigate(['/login']);

  }
}
