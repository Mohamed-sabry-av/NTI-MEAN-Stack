import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: false,

  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit{
  cartProduct: any = ([] = []);
  total: any = 0;
  success:boolean= false
  LoggedIn:boolean = true
  

  ngOnInIt():void{
    this.getCartProducts()
  }
  constructor(private CartService:CartService) {}
  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!);
    } else {
      console.log('No cart data in localStorage'); // لو مفيش بيانات
    }
    this.getCartTotal();
  }

  minusAmount(i: number) {
    this.cartProduct[i].quantitiy--;
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
    this.getCartTotal();
  }

  addAmount(i: number) {
    this.cartProduct[i].quantitiy++;
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
    this.getCartTotal();
  }

  detectChange() {
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }

  removeFromCart(i: number) {
    this.cartProduct.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }

  removeAll(){
    this.cartProduct = []
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }

  
  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProduct) {
      this.total +=
      this.cartProduct[x].item.price * this.cartProduct[x].quantitiy;
    }
  }


  addCart(){
    let userId = localStorage.getItem('userId');
    if (!userId) {
      this.LoggedIn = false
      return;
    }
    this.cartProduct.forEach((product: any) => {
      let Model = {
        userId: userId,  // التأكد من إضافة userId
        productId: product.item._id,  // إرسال productId
        quantity: product.quantitiy  // إرسال quantity
      };
      console.log('Model being sent:', Model);
  
    this.CartService.CreateNewCart(Model).subscribe(
      (res) => {
        this.success = true;
        console.log('Response from server:', res); // طباعة الرد من الخادم
      },
      (error) => {
        console.error('Error creating cart:', error); // طباعة الخطأ في حالة فشل الطلب
      }
    );
  }
);
 this.removeAll()
}
}