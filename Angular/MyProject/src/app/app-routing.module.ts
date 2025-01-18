import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsComponent } from './products/products.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { AdminRoutingModule } from './Admin/admin-routing.module';  
import { guardGuard } from './guard/guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartPageComponent, canActivate: [guardGuard] },
  { path: 'productPage/:id', component: ProductPageComponent },
  { path: 'admin', loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule) },  // الـ lazy loading للموديل
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminRoutingModule],  //
  exports: [RouterModule],
})
export class AppRoutingModule {}
