import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';
import { Subcategory } from '../../models/subcategory.models';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: false,
  
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  isAddingCategory = false;
  isAddingSubcategory= false;
  productForm: FormGroup;
  categories!: Category[];
  subcategories!: Subcategory[];
  sizes: string[] = ['XXL', 'S', 'M', 'L', 'XL'];
  imagePreview: string | ArrayBuffer | null = null;
  selectedSize: string | null = null;
  constructor(
    private fb: FormBuilder,
    private categoryS: CategoryService,
    private subcategoryS: SubcategoryService,
    private productS: ProductService,
  
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      size: ['', Validators.required],
      color: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(0)]],
      productImage: [null, Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      pinToHome: [false],
      newCategoryName: [''],
      newSubcategoryName: ['']
    });
  }

  ngOnInit(): void {
    this.categoryS.getCategories().subscribe((response) => {
      console.log(response.data);
      this.categories = response.data;
    });
  }

  getSubcategories() {
    this.subcategoryS
      .getSubcategoriesOfCategory(this.category?.value)
      .subscribe((response) => {
        this.subcategories = response.data;
      });
  }

  selectSize(size: string): void {
    this.selectedSize = size;
    this.size?.setValue(size); 
  }

  
  toggleAddCategory(): void {
    this.isAddingCategory = !this.isAddingCategory;
    console.log(this.isAddingCategory)
    if (!this.isAddingCategory) {
      this.productForm.get('newCategoryName')?.setValue('');
    }
  }
  toggleAddSubcategory(): void {
    this.isAddingSubcategory = !this.isAddingSubcategory;
    console.log(this.isAddingSubcategory)
    if (!this.isAddingSubcategory) {
      this.productForm.get('newSubcategoryName')?.setValue('');
    }
  }
  saveCategory(): void {
    const newCategoryName = this.productForm.get('newCategoryName')?.value.trim();
    if (newCategoryName) {
      const newCategory = { name: newCategoryName };
      this.categoryS.addCategory(newCategory).subscribe(
        (response) => {
          console.log('Category added:', response);
          
          // Reload the category list
          this.categoryS.getCategories().subscribe((updatedResponse) => {
            this.categories = updatedResponse.data;
            console.log('Updated categories:', this.categories);
          });
  
          // Reset the form field and toggle state
          this.isAddingCategory = false;
          this.productForm.get('newCategoryName')?.setValue('');
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    } else {
      alert('Category name cannot be empty.');
    }
  }
  saveSubcategory(): void {
    const newSubcategoryName = this.productForm.get('newSubcategoryName')?.value.trim();
    if (newSubcategoryName) {
      const newSubccategory = { name: newSubcategoryName,category:this.productForm.get('category')?.value };
      this.subcategoryS.addSubcategoriesOfCategory(newSubccategory).subscribe(
        (response) => {
          console.log('Category added:', response);
          this.subcategoryS.getSubcategoriesOfCategory(this.productForm.get('category')?.value ).subscribe((updatedResponse) => {
            this.subcategories = updatedResponse.data;
            console.log('Updated categories:', this.subcategories);
          });
          this.isAddingSubcategory = false;
          this.productForm.get('newSubcategoryName')?.setValue('');
        }
        
      );
    } else {
      alert('Category name cannot be empty.');
    }
  }
  
  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
      this.productForm.get('productImage')?.setValue(file);
    }
  }
  
  
  onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm);
      const formData = new FormData();
      formData.append('name', this.name?.value);
      formData.append('description', this.description?.value);
      formData.append('size', this.size?.value);
      formData.append('color', this.color?.value);
      formData.append('brand', this.brand?.value);
      formData.append('price', this.price?.value);
      formData.append('amount', this.amount?.value);
      formData.append('productImage', this.productImage?.value);
      formData.append('category', this.category?.value);
      formData.append('subcategory', this.subcategory?.value);
      formData.append('pinToHome', this.productForm.get('pinToHome')?.value);
      console.log(formData);
      console.log(formData.values);
      this.productS.addProduct(formData).subscribe((res) => {
        console.log(res);
      });
    } else {
      console.log('Form is invalid');
    }
  }
  get name() {
    return this.productForm.get('name');
  }
  
  get description() {
    return this.productForm.get('description');
  }
  
  get size() {
    return this.productForm.get('size');
  }
  
  get color() {
    return this.productForm.get('color');
  }
  
  get brand() {
    return this.productForm.get('brand');
  }
  
  get price() {
    return this.productForm.get('price');
  }
  
  get amount() {
    return this.productForm.get('amount');
  }
  
  get productImage() {
    return this.productForm.get('productImage');
  }
  
  get category() {
    return this.productForm.get('category');
  }
  
  get subcategory() {
    return this.productForm.get('subcategory');
  }
  
}
