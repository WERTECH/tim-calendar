import { AuthGuard } from './user/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'', component: HomePageComponent, canActivate: [AuthGuard] },
  { path:'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'appointment', loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule) , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
