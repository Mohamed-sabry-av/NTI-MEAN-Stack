import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-products',
  standalone: false,
  
  templateUrl: './display-products.component.html',
  styleUrl: './display-products.component.css'
})
export class DisplayProductsComponent {

  products: Product[] = [];
  displayedColumns: string[] = [
    'name', 
    'description', 
    'price', 
    'color', 
    'size', 
    'brand', 
    'actions'
  ];

  constructor(private productService: ProductService,private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products =response.data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        alert('Product deleted');
        this.loadProducts(); // Reload the products after deletion
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }
  editProduct(productId: string): void {
    this.router.navigate(['admin/dashboard/product/edit', productId]);
  }
}
