import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSidebarComponent } from './products/product-sidebar/product-sidebar.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';  // Added HttpClientModule
import { ProductGridComponent } from './products/product-grid/product-grid.component';
import { SpinnerComponent } from './Shared/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { HandelErrorIntercptor } from './Shared/interseptors/handel.error.interceptor';
import { LikedComponent } from './liked/liked.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    CategoriesComponent,
    LoginComponent,
    SignupComponent,
    ProductPageComponent,
    ProductSidebarComponent,
    ProductCardComponent,
    CartPageComponent,
    ProductGridComponent,
    SpinnerComponent,
    LikedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandelErrorIntercptor, // Renamed
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Remove if not necessary
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    library.add(faMoneyBill);  // Keep here for initializing icons
  }
}
