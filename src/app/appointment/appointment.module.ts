import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';


@NgModule({
  declarations: [AppointmentComponent, AppointmentListComponent, AppointmentDetailComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule
  ],
  exports: [AppointmentListComponent,AppointmentComponent]
})
export class AppointmentModule { }
