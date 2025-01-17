import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataBaseService } from './data-base.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient, private database:DataBaseService) { }

  CreateNewCart(model:any){
    return this.database.postRequest('cart/add',model)
  }
}
