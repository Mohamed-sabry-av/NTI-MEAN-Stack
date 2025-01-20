import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashUsersComponent } from './dash-users/dash-users.component';
import { AdminComponent } from './admin.component';
import { DashProductsComponent } from './dash-products/dash-products.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    DashUsersComponent,
    AdminComponent,
    DashProductsComponent,
    LayoutComponent,
    SidebarComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
