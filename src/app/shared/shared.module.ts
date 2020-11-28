import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppContainerComponent } from './app-container/app-container.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
const components = [
  AppContainerComponent
];

const modules = [
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule,
  CommonModule,
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
];

@NgModule({
  declarations: [...components],
  imports: [ ...modules  ],
  exports: [...modules, ...components],
})
export class SharedModule { }
