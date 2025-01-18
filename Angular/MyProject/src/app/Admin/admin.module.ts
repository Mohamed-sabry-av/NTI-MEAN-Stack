import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { DisplayProductsComponent } from './display-products/display-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryAdminComponent } from './category/category-admin.component';
import { MatOptionModule } from '@angular/material/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';

import { OrderDetailsDialog } from './orders-admin/order-details-dialog/order-details-dialog.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeliveryDetailsDialogComponent } from './orders-admin/delivery-details-dialog/delivery-details-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OrdersAdminComponent,
    OrderDetailsDialog,
    SidebarComponent,
    DisplayProductsComponent,
    EditProductComponent,
    AddProductComponent,
    CategoryAdminComponent,
    LayoutComponent,
    DeliveryDetailsDialogComponent
  ],
  imports: [
    AdminRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatOptionModule,
    BaseChartDirective, 
    BrowserAnimationsModule,
    
  ],

})
export class AdminModule {}
