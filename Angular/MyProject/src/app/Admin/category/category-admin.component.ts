import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Subcategory } from '../../models/subcategory.models';
import { SubcategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'app-category-admin',
  standalone: false,
  
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.css'
})
export class CategoryAdminComponent {

  categories: any[] = [];
  subcategories: any[] = [];
  selectedCategory: any = null;
  newCategory: any = { name: '' };
  newSubcategory: any = { name: '' };
  editingCategory: any = null;
  editingSubcategory: any = null;
  

  constructor(private categoryService: CategoryService,private subcategoryService:SubcategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }
  fetchSubcategories(categoryId: string) {
    console.log(categoryId)
    
    this.selectedCategory = this.categories.find((cat) => cat._id === categoryId);
    this.newSubcategory = { name: '', category: this.selectedCategory._id };
    this.subcategoryService.getSubcategoriesOfCategory(categoryId).subscribe((response) => {
      this.subcategories = response.data;
    });
  }

  onAddCategory() {
    this.categoryService.addCategory(this.newCategory).subscribe(() => {
      this.loadCategories();
      this.newCategory = { name: '' };
    });
  }
  onAddSubcategory() {
    console.log("***")
    if (this.selectedCategory) {
      console.log("selc")
      this.subcategoryService.addSubcategoriesOfCategory(this.newSubcategory)
        .subscribe(() => {
          this.fetchSubcategories(this.selectedCategory._id);
          // this.newSubcategory = { name: };
        });
    }
  }

  
  closeSubcategories() {
    this.selectedCategory = null;
    this.subcategories = [];
  }
  onEditCategory(category: any) {
    this.editingCategory = { ...category };
  }


  

  cancelCategoryEdit() {
    this.editingCategory = null;
  }

  onDeleteCategory(categoryId: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe(() => {
        this.loadCategories();
        this.subcategories = [];
        this.selectedCategory = null;
      });
    }
  }

  onEditSubcategory(subcategory: any) {
    this.editingSubcategory = { ...subcategory };
  }
  onUpdateCategory() {
    if (this.editingCategory) {
      console.log(this.editingCategory)
      this.categoryService
        .updateCategory(this.editingCategory._id, this.editingCategory)
        .subscribe(() => {
          this.loadCategories();
          this.cancelCategoryEdit();
        });
    }
  }
  onUpdateSubcategory() {
    if (this.editingSubcategory) {
      console.log(this.editingSubcategory)
      this.subcategoryService
        .updateSubcategory(
          this.editingSubcategory._id, this.editingSubcategory
        )
        .subscribe((response) => {
          console.log(response);
          this.fetchSubcategories(this.selectedCategory._id);
          this.cancelSubcategoryEdit();
        });
    }
  }

  cancelSubcategoryEdit() {
    this.editingSubcategory = null;
  }

  onDeleteSubcategory(subcategoryId: string) {
    if (confirm('Are you sure you want to delete this subcategory?')) {
      this.subcategoryService
        .deleteSubcategory(subcategoryId)
        .subscribe(() => this.fetchSubcategories(this.selectedCategory._id));
    }
  }
}


