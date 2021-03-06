import { AuthService } from './auth.service';
import { SnackService } from './../services/snack.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth,
    private authSerivice: AuthService,
    private snack: SnackService){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean>{

    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user || this.authSerivice.isLoggedIn();
    
    if(!isLoggedIn) {//return true;
      this.snack.authError();
    }
      return isLoggedIn;
  }

}
