import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from './../appointment/appointment.model';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../appointment/appointment.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  minDate = new Date(Date.now());
  action: string;
  local_data: any;
  sub: Subscription;
  appointmentForm: FormGroup;
  availableTime: string[] =[];
  appointmentTime = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Appointment,
    private appointmentService: AppointmentService,private fb: FormBuilder
    ) {
      this.local_data = {...data};
      this.action = this.local_data.action;
      if(this.action=='Update'){
        this.setAvailabeTime(this.minDate);
        this.  appointmentForm = this.fb.group({
          name: this.local_data.name,
          phoneNumber:  this.local_data.phoneNumber,
          company: [ this.local_data.company, Validators.required],
          appointmentDate: [ this.local_data.appointmentDate, Validators.required],
          appointmentTime: [ this.local_data.appointmentTime, Validators.required],
          brief: [ this.local_data.brief, Validators.required],
          town: [ this.local_data.town, Validators.required],
        });
      }
    }

    doAction(){
      if(this.action=='Update'){this.local_data = {...this.appointmentTime.values}}
      this.dialogRef.close({event:this.action,data:this.local_data});
    }

    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
    }

  setAvailabeTime(selectedDate = this.appointmentForm.get('appointmentDate').value.toString()) {

    this.sub = this.appointmentService
      .getAppointmentByDate(selectedDate)
      .subscribe(appointments => {
        this.availableTime = this.appointmentTime;
        appointments.forEach(appointment => {;
        this.availableTime = this.availableTime.filter(appTime => appTime != appointment.appointmentTime);
        })
      });
  }

}
