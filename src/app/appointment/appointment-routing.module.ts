import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';

const routes: Routes = [
  {path:'list', component: AppointmentListComponent},
  {path:':id', component: AppointmentDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,]
})
export class AppointmentRoutingModule { }
