import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUser: 'LOGGED_USER';
  sub: Subscription;

  constructor(private afAuth: AngularFireAuth,
    private userSerive: UserService) { }

  async login(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password);

    this.sub = this.userSerive
      .getLoginUser()
      .subscribe(user => {
        this.doLoginUser(user);
      });
  }

  doLoginUser(currentUser: User) {
    localStorage.setItem(this.loggedUser, JSON.stringify(currentUser) );
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem(this.loggedUser));
  }

  isAdmin(): boolean {
    if(this.getLoggedUser() && this.getLoggedUser().role === 'admin') {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.loggedUser);
    this.afAuth.signOut();
    return true;
  }

  isLoggedIn() {console.log('is login');
    return !!this.getLoggedUser();
  }

}
