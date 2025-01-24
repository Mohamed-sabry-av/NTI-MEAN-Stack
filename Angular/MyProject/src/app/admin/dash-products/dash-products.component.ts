import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-dash-products',
  standalone: false,
  templateUrl: './dash-products.component.html',
  styleUrls: ['./dash-products.component.css'], // Fixed typo
})
export class DashProductsComponent implements OnInit {
  isModelOpen = false;
  products: any[]=[];
  categories: any[]=[];
  productForm !: FormGroup;
  success = false;
  showSnackBar = false;
  editingProduct: any = null; // Add this line
  productToDelete: any = null; // Add this line
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this. allProducts()
    this.allCategories()    
    this.formValidators()
  }

  formValidators () {
  this.productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    details: ['', [Validators.required, Validators.minLength(10)]], // تأكد من تطابق الاسم مع الباك اند
    price: ['', [Validators.required, Validators.min(1)]],
    category: ['', Validators.required],
    image: [null, Validators.required], 
    discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    images: [null], 
  })}

  allProducts(){
     this.productsService.getAllProducts().subscribe((products) => {
      console.log('Products:', products);
      this.products = products;
    });
  }

  allCategories(){
    this.categoriesService.getAllCategories().subscribe((category) => {
      console.log('Categories:', category); // تحقق من البيانات هنا
      this.categories = category.Categories;
    });
  }

  openModel(product: any = null): void {
    this.isModelOpen = true;
    if (product) {
      this.editingProduct = product;
      this.productForm.patchValue({
        name: product.name,
        details: product.details,
        price: product.price,
        category: product.category,
        discount: product.discount,
        rating: product.rating,
        image: product.image,
        images: product.images
      });
    } else {
      this.editingProduct = null;
      this.productForm.reset();
    }
  }

  closeModel(): void {
    this.isModelOpen = false;
    this.editingProduct = null;
  }

  onFileChange(event: any, field: 'image' | 'images') {
    const files = event.target?.files;
    if (!files || files.length === 0) return;
  
    if (field === 'image') {
      // للتعامل مع الصورة الأساسية
      const mainImage = files[0]; // اختر الملف الأول فقط
      this.productForm.patchValue({ image: mainImage });
      this.productForm.get('image')?.updateValueAndValidity();
    } else if (field === 'images') {
      // للتعامل مع الصور الإضافية
      const currentImages = this.productForm.get('images')?.value || [];
      const newImages = [...currentImages, ...Array.from(files)];
      this.productForm.patchValue({ images: newImages });
      this.productForm.get('images')?.updateValueAndValidity();
    }
  }

  
  addProduct() {
    if (this.editingProduct) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  createProduct() {
    let formData = new FormData();
    console.log('FormData:', Array.from(formData.entries()));

    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('categoryName', this.productForm.get('category')?.value);
    formData.append('details', this.productForm.get('details')?.value);
    formData.append('discount', this.productForm.get('discount')?.value);
    formData.append('rating', this.productForm.get('rating')?.value);

    const mainImage = this.productForm.get('image')?.value;
    if (mainImage instanceof File) {
      formData.append('image', mainImage);
    } else {
      console.error('Main image is not a valid file.');
    }    
    // إضافة صور متعددة
  const images = this.productForm.get('images')?.value;
  if (images && images.length > 0) {
    images.forEach((file: any) => {
      formData.append('images', file);
    });
  }
  // console.log('FormData:', Array.from(formData.entries()));
    this.productsService.PostProduct(formData).subscribe((data) => {
      console.log(data);
      this.closeModel();
      this.success = true;
      this.allProducts(); // تحديث القائمة بعد الإضافة
      this.showAlert('Product added successfully!', 'success');
    },
    (error) => {
      console.log(error);
      this.showAlert('Error adding product.', 'error');
    });
  }
  
  confirmDeleteProduct(product: any): void {
    this.productToDelete = product;
    // Logic to open confirmation dialog
  }

  deleteProduct(): void {
    if (this.productToDelete) {
      this.productsService.deleteProduct(this.productToDelete._id).subscribe((data) => {
        console.log(data);
        this.allProducts();
        this.productToDelete = null;
        this.showAlert('Product deleted successfully!', 'success');
      },
      (error) => {
        console.log(error);
        this.showAlert('Error deleting product.', 'error');
      });
    }
  }

  onConfirmDelete(result: boolean): void {
    if (result) {
      this.deleteProduct();
    }
    this.productToDelete = null;
  }

  updateProduct() {
    let formData = new FormData();
    console.log('FormData:', Array.from(formData.entries()));

    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('categoryName', this.productForm.get('category')?.value);
    formData.append('details', this.productForm.get('details')?.value);
    formData.append('discount', this.productForm.get('discount')?.value);
    formData.append('rating', this.productForm.get('rating')?.value);

    const mainImage = this.productForm.get('image')?.value;
    if (mainImage instanceof File) {
      formData.append('image', mainImage);
    } else {
      console.error('Main image is not a valid file.');
    }    
    // إضافة صور متعددة
    const images = this.productForm.get('images')?.value;
    if (images && images.length > 0) {
      images.forEach((file: any) => {
        formData.append('images', file);
      });
    }
    this.productsService.updateProduct(this.editingProduct._id, formData).subscribe((data) => {
      console.log(data);
      this.closeModel();
      this.success = true;
      this.allProducts();
      this.showAlert('Product updated successfully!', 'success');
    },
    (error) => {
      console.log(error);
      this.showAlert('Error updating product.', 'error');
    });
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