import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { observable, Observable } from 'rxjs';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // getCategories() {
  //   throw new Error('Method not implemented.');
  // }

  // constructor(private http: HttpClient) { }

  //Products APIs
  // ApiURL = 'http://localhost:3000/product'; 
  // UploadImage = 'http://localhost:3000/images'; 


  // getAllProducts(): Observable<any> {
  //   return this.http.get<any>(this.ApiURL); 
  // }
  

  
// درس ال SingleTone
  database = inject(DataBaseService)

  getAllProducts(): Observable<any>{
    return this.database.getRequest('product')
  }

  uploadImages():Observable<any>{
    return this.database.getRequest('images')
  }

  getProductById(id:any){
    return this.database.getRequest('product/'+id)
  }
}
