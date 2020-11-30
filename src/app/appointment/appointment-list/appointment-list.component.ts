import { Appointment } from './../appointment.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../appointment.service';
import { AppointmentListDataSource, AppointmentListItem } from './appointment-list-datasource';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AppointmentListItem>;
  data: Appointment[] = [];
  sub: Subscription;

  constructor (private appointmentService: AppointmentService){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  displayedColumns: string[] = ['name', 'phoneNumber', 'email',
                               'company', 'appointmentTime',
                               'appointmentDate', 'brief'];

  ngOnInit() {
    this.sub = this.appointmentService
    .getUserApointments()
    .subscribe(appointments => {console.log(appointments)
      this.data = appointments
    });
  }

}
