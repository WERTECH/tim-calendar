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
    const dialogWidth = action =='Update' ? '600px' : '300px';
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: dialogWidth,
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
      console.log(value.id, row_obj.id)
      if(value.id == row_obj.id){
        value = {...row_obj};
        this.appointmentService.updateAppointment(value.id, value);
      }
      return true;
    });
  }

  deleteRowData(row_obj){
    this.data = this.data.filter((value,key)=>{
      this.appointmentService.deleteAppointment(row_obj.id);
      return value.id != row_obj.id;
    });
  }

}
