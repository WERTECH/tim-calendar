import { AuthService } from './../../user/auth.service';
import { AppointmentService } from './../appointment.service';
import { UserService } from './../../user/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { User } from 'src/app/user/user.model';
import { Appointment } from '../appointment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  minDate = new Date(Date.now());
  showBookingForm: boolean = false;
  _selectedDate: string = '';
  selectedTime: string = '';
  availableTime: string[] = [];
  appointments: Appointment [] = [];
  loginUser: User;
  loading:boolean  = false;
  sub: Subscription;

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

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  // getUserDetails() {
  //   const user = this.userSerive.getLoginUser();
  //   console.log(user);
  // }
  ngOnInit(): void {
    this.loginUser = this.authService.getLoggedUser();
    this.setAvailabeTime(this.minDate.toDateString());

    if(!this.loginUser || this.loginUser.name === null) {
      this.getUserCureentUserF();
    } else {
      this.initializeFormFields();
    }

  }

  toggleShowForm(){
    this.showBookingForm = !this.showBookingForm;
  }

  // get current user from firebase
  getUserCureentUserF(){
    this.sub = this.userSerive
      .getLoginUser()
      .subscribe(user => {
        this.loginUser = user ? (user): new User();
        console.log('login user: ', this.loginUser)

        this.setAvailabeTime(this.minDate.toDateString());
        this.initializeFormFields();
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initializeFormFields() {
    this.appointmentForm.controls['name'].setValue(this.loginUser.name);
    this.appointmentForm.controls['phoneNumber'].setValue(this.loginUser.phoneNumber);
  }

  appointmentForm = this.fb.group({
    name: null,
    phoneNumber: null,
    company: [null, Validators.required],
    appointmentDate: [this.minDate, Validators.required],
    appointmentTime: [null, Validators.required],
    brief: [null, Validators.required],
    town: [null, Validators.required],
  });


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

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private userSerive: UserService) {}

  onSubmit() {
    const appDate = new Date(this.appointmentForm.get('appointmentDate').value).toDateString();
    const newAppointment = {... new Appointment(), ... this.appointmentForm.value, appointmentDate: appDate, email: this.loginUser.email}

    this.appointmentService.createAppointment(newAppointment)
      .then(result => {
        alert('Saved Thanks!');

        this.appointmentForm.reset();
        // this.formGroupDirective.resetForm();
        this.showBookingForm = true;
      })
      .catch(err=> console.log(err));
  }
}
