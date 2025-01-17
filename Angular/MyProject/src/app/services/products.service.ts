import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { observable, Observable } from 'rxjs';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
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
