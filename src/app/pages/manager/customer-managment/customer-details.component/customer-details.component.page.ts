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

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    private http: HttpClient
  ) {}

  editCustomer() {
    const url = `http://localhost:3000/api/customers/${this.customer.customerId}`;
    this.http.post(url, this.customer).subscribe(
      () => {
        console.log('Customer details updated successfully!');
        // Perform any necessary actions after successful update
      },
      (error) => {
        console.error('Error updating customer details:', error);
        // Handle the error appropriately
      }
    );
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    
  }

  saveChanges() {
    // Save changes to the database
    const url = `http://localhost:3000/api/customers/${this.customer.phoneNumber}`;
    this.http.post(url, this.customer).subscribe(
      () => {
        console.log('Customer details updated successfully!');
        // Perform any necessary actions after successful update

        // Toggle the edit mode to turn it off
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
        // Perform any necessary actions after successful deletion
  
        // Close the modal or navigate to another page
        this.closeModal();
        // Reload the page
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting customer:', error);
        // Handle the error appropriately
      }
    );
  }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
    window.location.reload();
  }
}
