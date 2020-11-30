import { Appointment } from './../appointment.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../appointment.service';
import { AppointmentListDataSource, AppointmentListItem } from './appointment-list-datasource';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';

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

  constructor (private appointmentService: AppointmentService,
    public dialog: MatDialog){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  displayedColumns: string[] = ['name', 'appointmentTime',
                               'appointmentDate', 'brief', 'action'];

  ngOnInit() {
    this.sub = this.appointmentService
    .getUserApointments()
    .subscribe(appointments => {console.log(appointments)
      this.data = appointments
    });
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  updateRowData(row_obj){
    this.data = this.data.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }

  deleteRowData(row_obj){
    this.data = this.data.filter((value,key)=>{
      console.log(value,'this to del',row_obj.id);
      this.appointmentService.deleteAppointment(row_obj.id);
      return value.id != row_obj.id;
    });
  }

}
