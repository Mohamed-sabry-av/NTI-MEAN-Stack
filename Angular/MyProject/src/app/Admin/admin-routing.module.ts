import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayProductsComponent } from './display-products/display-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryAdminComponent } from './category/category-admin.component';
import { LayoutComponent } from './layout/layout.component';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';
import { authGuard } from '../guards/auth.guard';
import { AuthComponent } from '../auth/auth.component';
import { AdminGuard } from '../guards/admin.guard';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate:[authGuard,AdminGuard],  // The layout component that contains the sidebar
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // Default to dashboard
      { path: 'dashboard', component: DashboardComponent },
      
      // Nested routes for the dashboard
      
      { path: 'dashboard/productsAdmin', component: DisplayProductsComponent },
      { path: 'dashboard/addProduct', component: AddProductComponent },
      { path: 'dashboard/categoryAdmin', component: CategoryAdminComponent},
      { path: 'dashboard/ordersAdmin', component: OrdersAdminComponent},
      {
        path:'dashboard/product/edit/:id',component:EditProductComponent
      },
      
    ]
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
