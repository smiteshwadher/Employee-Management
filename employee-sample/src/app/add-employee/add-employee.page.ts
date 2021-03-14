import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AppConstants } from '../constants/app-constants';
import { v4 as uuidv4 } from 'uuid';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  addEmployeeForm = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = this.appConstants.FORMS.EMPLOYEE;
  employeeAge: any = [];
  employeeDetails: any = [];
  private sub: any;
  showUpdateButton: boolean;
  employeeDetailsObjectFromUpdateTask: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appConstants: AppConstants,
    private storage: Storage,
    private toast: ToastController
  ) { }

  async ngOnInit() {

    this.sub = this.route.queryParams.subscribe(async params => {
      if (params['employeeDetail']) {
        this.model = JSON.parse(params['employeeDetail']);
        this.employeeDetailsObjectFromUpdateTask = JSON.parse(params['employeeDetail']);
      }

      this.employeeDetails = await this.storage.get('employeeTable');

      if (params['task'] === 'update') {
        this.showUpdateButton = true;
      } else {
        this.showUpdateButton = false;
      }
    });

    this.createAgeOptions(20, 70);

    this.fields.forEach(element => {
      if (element.key === 'employeeAge') {
        element.templateOptions.options = this.employeeAge;
      }
    });
  }

  createAgeOptions(minimumAge, maximumAge) {
    for (let i = minimumAge; i <= maximumAge; i++) {
      const obj = {
        age: i
      }
      this.employeeAge.push(obj);
    }
    console.log('EMPLOYEE AGE ARRAY IS :', this.employeeAge);
  }

  async saveEmployeeDetails() {

    let objToSave;
    
    if(this.employeeDetails) {
      objToSave = {
        ...this.addEmployeeForm.value,
        uniqueId: uuidv4(),
      }
      this.employeeDetails.push(objToSave)
    } else {
      this.employeeDetails = [];
      objToSave = {
        ...this.addEmployeeForm.value,
        uniqueId: uuidv4(),
      }

      this.employeeDetails.push(objToSave)
    }

    const toast = await this.toast.create({
      message: 'Employee Detail for ' + this.addEmployeeForm.value.employeeName + ' Saved.',
      duration: 2000
    });
    toast.present();

    await this.storage.set('employeeTable', this.employeeDetails);
    this.router.navigate(['/home'], { replaceUrl: true });
    console.log('EMPLOYEE DETAILS IS :', this.employeeDetails);
  }

  async updateEmployeeDetails() {
    console.log('EMPLOYEE DETAILS TO UPDATE IS :', this.addEmployeeForm.value);

    for (let index = 0; index < this.employeeDetails.length; index++) {
      if (this.employeeDetails[index].uniqueId === this.employeeDetailsObjectFromUpdateTask.uniqueId) {
        this.employeeDetails[index] = { ...this.addEmployeeForm.value, uniqueId: this.employeeDetails[index].uniqueId}
        const toast = await this.toast.create({
          message: 'Employee Detail for ' + this.addEmployeeForm.value.employeeName + ' Updated.',
          duration: 2000
        });
        toast.present();
      }      
    }
    await this.storage.set('employeeTable', this.employeeDetails);
    this.router.navigate(['/home'], { replaceUrl: true });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.options.resetModel();
  }

}
