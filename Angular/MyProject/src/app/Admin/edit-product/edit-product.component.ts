import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { Subcategory } from '../../models/subcategory.models';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model'; // Assuming you have a Product model

@Component({
  standalone:false,
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  isAddingCategory = false;
  isAddingSubcategory = false;
  productForm: FormGroup;
  categories!: Category[];
  subcategories!: Subcategory[];
  sizes: string[] = ['XXL', 'S', 'M', 'L', 'XL'];
  imagePreview: String | ArrayBuffer | null = null;
  selectedSize: String | null = null;
  selectedCategory:String|null=null;
  selectedSubcategory:String|null=null;
  productId!: string;
  selectedPinToHome!:Boolean

  constructor(
    private fb: FormBuilder,
    private categoryS: CategoryService,
    private subcategoryS: SubcategoryService,
    private productS: ProductService,
    private route: ActivatedRoute,
    private router: Router
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

    this.productId = this.route.snapshot.paramMap.get('id') || '';
  
    this.categoryS.getCategories().subscribe((response) => {
      this.categories = response.data;

      if (this.productId) {
        this.productS.getProduct(this.productId).subscribe((response) => {
          const product: Product = response.data;
  
          
          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            amount: product.amount,
            brand: product.brand,
            color: product.color,
            size: product.size,
            category: product.category._id, 
            subcategory: product.subcategory._id, 
            pinToHome: product.pinToHome,
            productImage: product.imageUrl,
            
          });

          this.selectedSize=product.size;
          this.selectedCategory = product.category.name;
          this.selectedSubcategory = product.subcategory.name;
          this.selectedPinToHome=product.pinToHome;
  
        
          this.imagePreview = "http://localhost:5000/images/"+product.imageUrl;
          console.log('Product Image URL:', product.imageUrl);
          console.log('Image Preview:', this.imagePreview);       
          this.subcategoryS
            .getSubcategoriesOfCategory(product.category._id)
            .subscribe((subcategoryResponse) => {
              this.subcategories = subcategoryResponse.data;
            });
        });
      }
    });
  }
  

  getSubcategories() {
    this.subcategoryS
      .getSubcategoriesOfCategory(this.productForm.get('category')?.value)
      .subscribe((response) => {
        this.subcategories = response.data;
      });
  }

  selectSize(size: string): void {
    this.selectedSize = size;
    this.productForm.get('size')?.setValue(size); 
  }

  toggleAddCategory(): void {
    this.isAddingCategory = !this.isAddingCategory;
    if (!this.isAddingCategory) {
      this.productForm.get('newCategoryName')?.setValue('');
    }
  }

  toggleAddSubcategory(): void {
    this.isAddingSubcategory = !this.isAddingSubcategory;
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
          this.categoryS.getCategories().subscribe((updatedResponse) => {
            this.categories = updatedResponse.data;
          });

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
      const newSubcategory = { name: newSubcategoryName, category: this.productForm.get('category')?.value };
      this.subcategoryS.addSubcategoriesOfCategory(newSubcategory).subscribe(
        (response) => {
          this.subcategoryS.getSubcategoriesOfCategory(this.productForm.get('category')?.value).subscribe((updatedResponse) => {
            this.subcategories = updatedResponse.data;
          });
          this.isAddingSubcategory = false;
          this.productForm.get('newSubcategoryName')?.setValue('');
        }
      );
    } else {
      alert('Subcategory name cannot be empty.');
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
  
  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value)
      const formData = new FormData();
      formData.append('name', this.name?.value);
      formData.append('description', this.description?.value);
      formData.append('size', this.size?.value);
      formData.append('color', this.color?.value);
      formData.append('brand', this.brand?.value);
      console.log(this.price?.value);
      formData.append('price', this.price?.value);
      formData.append('amount', this.amount?.value);
      formData.append('productImage', this.productImage?.value);
      formData.append('category', this.category?.value);
      formData.append('subcategory', this.subcategory?.value);
      formData.append('pinToHome', this.productForm.get('pinToHome')?.value);
      console.log(formData.values)

      this.productS.updateProduct(this.productId, formData).subscribe((res) => {
        console.log(res);
        // this.router.navigate(['/products']);
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
