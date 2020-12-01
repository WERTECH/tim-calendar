import { AuthService } from './../auth.service';
import { UserService } from './../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;
  type: 'login'| 'signup'| 'reset' = 'signup';
  loading = false;
  serverMessage: string;

  constructor(private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router,
    private authServise: AuthService,
    private userSerive: UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.minLength(3), Validators.required]],
      phoneNumber: ['', [Validators.minLength(10), Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []]
    });

  }

  changeType(val) {
    this.type = val;
    this.form.reset();
    this.serverMessage ='';
  }

  get isLogin() {
    return this.type === 'login';
  }
  get isSignup() {
    return this.type === 'signup';
  }
  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get name() {
    return this.form.get('name');
  }
  get phone() {
    return this.form.get('phoneNumber');
  }
  get password() {
    return this.form.get('password');
  }
  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get getPasswordDoesMatch() {
    if(!this.isSignup) {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onSubmit() {
    this.loading = true;
    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.authServise.login(email, password).then(_=>{
          //TODO:// admin route soon
          this.router.navigateByUrl('/');
        });
      }
      if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email, password).then(result => {
          const user = {... new User(), ... this.form.value, 'id':result.user.uid};

          this.userSerive.createUser(user)
          this.authServise.doLoginUser(user);
        } );

        this.router.navigateByUrl('/');
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check you email';
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;

  }
}
