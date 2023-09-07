import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.page.html',
  styleUrls: ['./customer-details.component.page.scss'],
})
export class CustomerDetailsComponentPage implements OnInit {
  @Input() customer: any;
  editMode: boolean = false;
  courses: Course[] = [];

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    private http: HttpClient

  ) {}

  ngOnInit() {
    this.fetchCourses();
  }
  


  fetchCourses() {
    this.http.get('http://localhost:3000/api/courses/list').subscribe(
      (data: any) => {
        this.courses = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  

  editCustomer() {
    const url = `http://localhost:3000/api/customers/${this.customer.phoneNumber}/${this.customer.childID}`;
    this.http.post(url, this.customer).subscribe(
      () => {
        console.log('Customer details updated successfully!');
      },
      (error) => {
        console.error('Error updating customer details:', error);
      }
    );
  }



  toggleEditMode() {
    this.editMode = !this.editMode;
    
  }

  cancel() {
    this.editMode = false;
  }

  saveChanges() {

    const url = `http://localhost:3000/api/customers/${this.customer.phoneNumber}/${this.customer.childID}`;
    this.http.post(url, this.customer).subscribe(
      () => {
        console.log('Customer details updated successfully!');

        this.toggleEditMode();
      },
      (error) => {
        console.error('Error updating customer details:', error);
        // Handle the error appropriately
      }
    );
  }
  

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'אישור',
      message: '? אתה בטוח שאתה רוצה למחוק את הלקוח',
      buttons: [
        {
          text: 'לא',
          role: 'cancel',
          handler: () => {
            console.log('Deletion canceled');
          },
        },
        {
          text: 'כן',
          handler: () => {
            this.deleteCustomer();
          },
        },
      ],
    });

    await alert.present();
  }

  deleteCustomer() {
    const url = `http://localhost:3000/api/customers/${this.customer.phoneNumber}/${this.customer.childID}`;
    this.http.delete(url).subscribe(
      () => {
        console.log('Customer deleted successfully!');

        this.closeModal();
     
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting customer:', error);
       
      }
    );
  }



  async closeModal() {
    await this.modalController.dismiss();
    window.location.reload();
  }
}

interface Course {
  courseType: string;
}