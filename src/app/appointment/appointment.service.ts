import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import  * as firebase  from 'firebase/app';
import { switchMap , map } from 'rxjs/operators';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentRef = this.db.collection('appointments');

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  // Create new appointment
  async createAppointment(data: Appointment) {
    const user = await this.afAuth.currentUser;
    return this.appointmentRef.add({
      ...data, uid: user.uid
    });
  }

  //detete appointment
  deleteAppointment(appointmentId: string) {
    return this.appointmentRef
      .doc(appointmentId)
      .delete();
  }

  //update appointment
  updateAppointment(appointmentId: string, data: Appointment) {
    return this.appointmentRef
        .doc(appointmentId)
        .update(data);
  }
// get appointments with date
  getAppointmentByDate(appointmentDate:string) {
    return this.db.collection('appointments',
    ref => ref.where('appointmentDate', '==', appointmentDate)).get();
  }

  // get all appointments
  getAppointments() {
    return this.db.collection<Appointment>('appointments',
    ref => ref.orderBy('appointmentDate')
    .orderBy('appointmentTime'))
    .valueChanges({idField:'id'});
  }

  // gett all appointments of a user
  getUserApointments() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.db.collection<Appointment>('appointments',
          ref => ref.where('uid', '==', user.uid)
          .orderBy('appointmentDate')
          .orderBy('appointmentTime'))
          .valueChanges({idField:'id'});
        } else {
          return [];
        }
      })
    );
  }
}
