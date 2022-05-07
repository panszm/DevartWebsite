import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavbarComponent } from './main-navbar.component';
import { MainNavbarItemComponent } from './main-navbar-item/main-navbar-item.component';

@NgModule({
  declarations: [MainNavbarComponent, MainNavbarItemComponent],
  imports: [CommonModule],
  exports: [MainNavbarComponent],
})
export class MainNavbarModule {}
