import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  cart :any []=[]

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        console.log(this.products);
        
        // تطبيق الفلتر على البيانات في الـ home
        this.filteredProducts = this.products.filter(product => product.isFeatured === true);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  addToCart(event: any): void {
    if ("cart" in localStorage) {
      this.cart = JSON.parse(localStorage.getItem("cart")!); 
    } else {
      this.cart = [];
    }
      let exist = this.cart.find(item => item.item._id === event.item._id);
    if (exist) {
      console.log('Product is already in the cart');
    } else {
      this.cart.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cart)); 
      console.log('Product added to cart');
    }
  
    console.log("Updated Cart: ", this.cart);
  }
  
}
