import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  employeeDetails: any = [];
  showMobileUI: boolean = true
  showOptionText: string
  constructor(
    private router: Router,
    private storage: Storage,
    private toast: ToastController
  ) {}

  async ionViewDidEnter() {
    this.employeeDetails = await this.storage.get('employeeTable');

    this.employeeDetails.forEach(element => {
      element.convertedSalary = element.employeeSalary.toLocaleString('en');
      console.log('CONVERTED IS :', element.convertedSalary);
    });

    if (this.showMobileUI) {
      this.showOptionText = 'Show Card View'
    } else {
      this.showOptionText = 'Show Tabular View'
    }
  }

  changeView() {
    this.showMobileUI = !this.showMobileUI
    if (this.showMobileUI) {
      this.showOptionText = 'Show Card View'
    } else {
      this.showOptionText = 'Show Tabular View'
    }
  }

  navigateToEmployeePage() {
    this.router.navigate(['/add-employee'], { replaceUrl: true });
  }

  editEmployee(employeeDetail) {
    console.log('EMPLOYEE DETAIL TO SEND IS :', employeeDetail);
    this.router.navigate(['/add-employee'], { queryParams: { employeeDetail: JSON.stringify(employeeDetail), task: 'update' } });
  }

  async deleteEmployee(employeeDetail) {
    for (let i = 0; i < this.employeeDetails.length; i++) {
      if (this.employeeDetails[i].uniqueId === employeeDetail.uniqueId) {
        const toast = await this.toast.create({
          message: 'Employee Detail for ' + employeeDetail.employeeName + ' Deleted.',
          duration: 2000
        });
        toast.present();
        this.employeeDetails.splice(i, 1);
        console.log('EMPLOYEE LIST AFTER DELETING IS :', this.employeeDetails);
        await this.storage.set('employeeTable', this.employeeDetails);
      }
    }
  }
}
