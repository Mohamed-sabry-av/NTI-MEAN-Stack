import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikedService {
  private likedProducts: any[] = [];
  private likedProductsSubject = new BehaviorSubject<any[]>(this.likedProducts);
  likedProducts$ = this.likedProductsSubject.asObservable(); // تعريف الـ Observable

  // إرجاع قائمة المنتجات المعجب بها
  getLikedProducts(): any[] {
    return this.likedProducts;
  }

  // إضافة منتج لقائمة الإعجابات
  addProductToLiked(product: any): void {
    if (!this.likedProducts.find((p) => p._id === product._id)) {
      this.likedProducts.push(product);
      this.likedProductsSubject.next(this.likedProducts); // تحديث الـ BehaviorSubject
    }
  }

  // إزالة منتج من قائمة الإعجابات
  removeProductFromLiked(productId: string): void {
    this.likedProducts = this.likedProducts.filter(
      (product) => product._id !== productId
    );
    this.likedProductsSubject.next(this.likedProducts); // تحديث الـ BehaviorSubject
  }
  }
  

