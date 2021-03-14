import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEmployeePageRoutingModule } from './add-employee-routing.module';

import { AddEmployeePage } from './add-employee.page';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEmployeePageRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forChild({ extras: { lazyRender: true } }),
  ],
  declarations: [AddEmployeePage]
})
export class AddEmployeePageModule {}
