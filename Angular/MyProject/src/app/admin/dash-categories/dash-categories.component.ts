import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dash-categories',
  standalone: false,

  templateUrl: './dash-categories.component.html',
  styleUrl: './dash-categories.component.css',
})
export class DashCategoriesComponent implements OnInit {
  isOpenModel = false;
  categories: any[] = [];
  categoryForm!: FormGroup;
  isEditing = false;
  editingCategoryId: string | null = null;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showSnackBar = false;
  categoryToDelete: string | null = null;
  productToDelete: string | null = null;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllCategories();
    this.formValidators();
  }

  formValidators() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe(
      (res) => {
        this.categories = res.Categories || [];
      },
      (err) => {
        console.log('error Fetching categories', err);
        this.showAlert('error Fetching categories', 'error');

      }
    );
  }

  openModel() {
    this.isEditing = false; 
    this.isOpenModel = true;
    this.categoryForm.reset();
    console.log('open model');
  }
  closeModel() {
    this.isOpenModel = false;
    console.log('closed');
  }

  postCategory() {
    this.createCategory();
  }

  createCategory() {
    const categoryData = {
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description,
    };
    this.categoriesService.postCategory(categoryData).subscribe(
      (res) => {
        this.showAlert('Category Created successfully!', 'success');
        this.getAllCategories();
        this.closeModel();
      },
      (err) => {
        console.log('error creating category', err);
        console.log('categoryData', categoryData);
        this.showAlert('Error adding product.', 'error');

      }
    );
  }

  confirmDeleteCategory(id: string) {
    this.categoryToDelete = id;
  }

  deleteCategory() {
    if (!this.categoryToDelete) return;
    this.categoriesService.deleteCategory(this.categoryToDelete).subscribe(
      (res) => {
        console.log('category deleted', res);
        this.showAlert('Category deleted successfully!', 'success');
        this.getAllCategories();
        this.categoryToDelete = null;
      },
      (err) => {
        console.log('error deleting category', err);
        this.showAlert('Error deleting product.', 'error');
        this.categoryToDelete = null;
      }
    );
  }

  editCategory(id: any) {
    this.isEditing = true; 
    this.editingCategoryId = id;

    this.categoriesService.getCategoryById(id).subscribe(
      (res) => {
        this.categoryForm.patchValue({
          name: res.name,
          description: res.description,
        });
        this.isOpenModel = true;
      },
      (err) => {
        console.log('error fetching category', err);
        this.showAlert('Error Fetching product.', 'error');

      }
    );
  }

  saveEditCategory() {

    const categoryData = {
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description,
    };
    this.categoriesService.editCategory(this.editingCategoryId, categoryData).subscribe(
      (res) => {
        this.showAlert('category updated successfully!', 'success');
        this.getAllCategories();
        this.closeModel();
      },
      (err) => {
        console.log('error editing category', err);
      }
    );
  }

  onConfirmDelete(result: boolean): void {
    if (result) {
      this.deleteCategory();
    }
    this.categoryToDelete = null;
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showSnackBar = true;
    setTimeout(() => {
      this.showSnackBar = false;
    }, 3000);
  }
}
