import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { SharedService } from '../../services/shared.service';
import { ProductsComponent } from '../products.component';


@Component({
  selector: 'app-product-grid',
  standalone: false,
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent implements OnInit {
  products: any[] = [];         
  filteredProducts: any[] = [];  
  filteredCategories: string[] = []; 
  cartProduct:any[]=[]

  constructor(
    private sharedService: SharedService,
    private productsService: ProductsService,
    private ProductsComponent:ProductsComponent
  ) {}

  // هنتصل الاول بالAPI من خلال السيرفيس اللي انا جبتها
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(products =>{
      this.products = (products)
      this.filteredProducts= products
      // console.log(products)
    })

    // Filters
    this.sharedService.categoryFilters$.subscribe((categories) => {
      this.filteredCategories = categories;
      console.log('Filtered Categories:', this.filteredCategories);
      this.applyFilters();
    });
  }


  
// apply filters on Products
  applyFilters(): void {
    this.ProductsComponent.loading = true
    if (this.filteredCategories.length === 0) {
      // إذا لم يتم تطبيق فلاتر، عرض كل المنتجات
      this.filteredProducts = [...this.products];
      console.log('No filters applied, showing all products:', this.filteredProducts);
    } else {
      // تطبيق الفلترة باستخدام `category` كـ `ObjectId`
      this.filteredProducts = this.products.filter((product) =>
        this.filteredCategories.includes(product.category),
      this.ProductsComponent.loading = false
      );
      console.log('Filters applied, showing filtered products:', this.filteredProducts);
    }
    this.ProductsComponent.loading = false

  }
  
  addToCart(event:any){
    if("cart" in localStorage){
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProduct.find(item => item.item._id == event.item._id)
      if(exist){
        console.log('Product is already There')
      }else{
      this.cartProduct.push(event)
      localStorage.setItem("cart",JSON.stringify(this.cartProduct))
      }
    }else{
      this.cartProduct.push(event)
      localStorage.setItem("cart",JSON.stringify(this.cartProduct))
    }
 
  }

  }
  
