import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { ProductsComponent } from '../products.component';

@Component({
  selector: 'app-product-sidebar',
  standalone:false,
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.css'], 
})
  export class ProductSidebarComponent implements OnInit {
    categories: any[] = [];
    private categoryFiltersSubscription: Subscription = Subscription.EMPTY;
  
    constructor(
      private categoriesService: CategoriesService,
      private sharedService: SharedService, 
      private ProductsComponent:ProductsComponent

    ) {}
  
    ngOnInit(): void {
      this.getCategories();
      this.categoryFiltersSubscription = this.sharedService.categoryFilters$.subscribe(
        (filters: string[]) => {
          console.log('Filtered Categories:', filters);
        }
      );
    }
  
  
    // جلب التصنيفات من الـ API
    getCategories(): void {
      this.ProductsComponent.loading = true
      this.categoriesService.getAllCategories().subscribe(
        (res: any) => {
          if (res && Array.isArray(res.Categories)) {
            this.categories = res.Categories;
          } else {
            console.error('Unexpected response format:', res);
            this.categories = [];
          }
          this.ProductsComponent.loading = false
        },
        (error: any) => {
          this.ProductsComponent.loading = false
          console.error('Error fetching categories:', error);
        }
      );
    }
  
    // فلترة الفئات بناءً على اختيارات المستخدم
    filterCategory(categoryId: string, event: Event): void {
      this.ProductsComponent.loading = true
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        console.log('Adding category filter:', categoryId);
        this.sharedService.addCategoryFilter(categoryId);
      } else {
        console.log('Removing category filter:', categoryId);
        this.sharedService.removeCategoryFilter(categoryId);
      }
      this.ProductsComponent.loading = false
    }
    
}
