import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomerDetailsComponentPage } from './customer-details.component/customer-details.component.page';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-managment',
  templateUrl: './customer-managment.page.html',
  styleUrls: ['./customer-managment.page.scss'],
})
export class CustomerManagmentPage implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  searchTerm: string = '';

  constructor(
    public modalController: ModalController,
    private customerService: CustomerService,
    private router: Router
  ) {}


  ngOnInit() {
    this.fetchCustomers();
  }

  goBack(){
    this.router.navigateByUrl('/manager');
  }

  fetchCustomers() {
    this.customerService.getCustomers().subscribe(
      (response: any[]) => {
        this.customers = response;
        this.filteredCustomers = this.customers;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  

  filterCustomers() {
    const searchTerm = this.searchTerm.toLowerCase();
    if (!searchTerm) {
      this.filteredCustomers = this.customers;
      return;
    }
  
    this.filteredCustomers = this.customers.filter((customer) => {
      // Filter by parent names
      const parentNames = customer.parentNames.toLowerCase();
      if (parentNames.includes(searchTerm)) {
        return true;
      }
  
      // Filter by phone number
      const phoneNumber = customer.phoneNumber.toString().toLowerCase();
      if (phoneNumber.includes(searchTerm)) {
        return true;
      }
  
      // Filter by child name
      const childName = customer.childName.toLowerCase();
      if (childName.includes(searchTerm)) {
        return true;
      }
  
      // Filter by course type
      const courseType = customer.courseType.toLowerCase();
      if (courseType.includes(searchTerm)) {
        return true;
      }
  
      return false;
    });
  }

  async openModal(customer: any) {
    const modal = await this.modalController.create({
      component: CustomerDetailsComponentPage,
      componentProps: {
        customer: customer,
      },
    });
    return await modal.present();
  }
}
