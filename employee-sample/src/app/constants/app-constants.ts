import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConstants {
    public FORMS = {
        EMPLOYEE: [
            {
                key: 'employeeName',
                type: 'input',
                templateOptions: {
                  appearance: 'outline',
                  label: 'Name',
                  required: true
                }
            },
            {
              key: 'employeeGender',
              type: 'radio',
              templateOptions: {
                appearance: 'outline',
                label: 'Gender',
                required: true,
                options: [
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' }
                ],
              },
            },
            {
              key: 'employeeAge',
              type: 'select',
              templateOptions: {
                appearance: 'outline',
                label: 'Age',
                valueProp: 'age',
                labelProp: 'age',
                required: true
              }
            },
            {
              key: 'employeeAddress',
              type: 'textarea',
              templateOptions: {
                label: 'Address',
                required: true,
                maxLength: 2000,
                rows: 5,
                appearance: 'outline'
              },
            },
            {
                key: 'employeeSalary',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  appearance: 'outline',
                  label: 'Salary',
                  required: true,
                  min: 0
                }
            },
        ],
    }
}