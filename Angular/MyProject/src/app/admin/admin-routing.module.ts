import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashProductsComponent } from './dash-products/dash-products.component';
import { DashUsersComponent } from './dash-users/dash-users.component';
import { DashCategoriesComponent } from './dash-categories/dash-categories.component';

const routes: Routes = [
  {
    path: 'dashboard', // مسار رئيسي للـ Admin
    component: LayoutComponent,
    children: [
      { path: 'dashboard', redirectTo: 'dashProducts', pathMatch: 'full' }, // إعادة توجيه
      { path: 'dashProducts', component: DashProductsComponent }, // صفحة المنتجات
      { path: 'dashUsers', component: DashUsersComponent }, // صفحة المستخدمين
      { path: 'dashCategories', component: DashCategoriesComponent } // صفحة المستخدمين
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
