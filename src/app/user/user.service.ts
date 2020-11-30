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
  userData
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }
  /*
  *Create new appointment document
  */
   createUser(user: User){
    return this.db.collection('users')
            .doc(user.id).set(user);
  }

  getLoginUser(){
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.collection<User>('users').doc<User>(user.uid).valueChanges({idField:'id'});
        } else {
          return ;
        }
      })
    );
    // console.log(user.uid)
    // return this.db.collection('users').doc(user.uid).get().subscribe(data => {
    //   console.log(data.data)
    //   return new User(
    //     data.get('id'),
    //     data.get('name'),
    //     data.get('phoneNumber'),
    //     data.get('email'),'',
    //     data.get('role'),'')
    // });
  }

}
