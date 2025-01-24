import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashUsersComponent } from './dash-users/dash-users.component';
import { AdminComponent } from './admin.component';
import { DashProductsComponent } from './dash-products/dash-products.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashCategoriesComponent } from './dash-categories/dash-categories.component';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';
import { AlertComponent } from './shared/alert/alert.component';


@NgModule({
  declarations: [
    DashUsersComponent,
    AdminComponent,
    DashProductsComponent,
    LayoutComponent,
    SidebarComponent,
    DashCategoriesComponent,
    ConfirmationComponent,
    AlertComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
