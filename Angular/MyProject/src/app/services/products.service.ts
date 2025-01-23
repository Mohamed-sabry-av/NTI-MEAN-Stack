import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Observable } from 'rxjs';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  // درس ال SingleTone
  database = inject(DataBaseService);

  getAllProducts(): Observable<any> {
    return this.database.getRequest('product');
  }
  PostProduct(productForm: FormData): Observable<any> {
    return this.database.postRequest('product', productForm);
  }

  uploadImages(): Observable<any> {
    return this.database.getRequest('images/');
  }
  uploadImagesDB(data: any): Observable<any> {
    return this.database.postRequest('images/', data);
  }

  deleteProduct(id:any):Observable<any>{
    return this.database.deleteRequest('product',id)
  }

  getProductById(id: any) {
    return this.database.getRequest('product/' + id);
  }

  updateProduct(id:any, data:any):Observable<any>{
    return this.database.editRequest('product', id, data)
  }
}
