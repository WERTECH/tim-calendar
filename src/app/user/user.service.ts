import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import  * as firebase  from 'firebase/app';
import { switchMap , map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }
  /*
  *Create new appointment document
  */
   createUser(user: User){
    return this.db.collection('users')
            .doc(user.id).set(user);
  }

}
