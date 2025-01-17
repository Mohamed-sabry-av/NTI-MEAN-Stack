import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartProduct:any=[]= []
  total:any = 0

  constructor(){}
  ngOnInit(): void {
    this.getCartProducts()
  }

getCartProducts(){
  if("cart" in localStorage){
    this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
  }else {
    console.log("No cart data in localStorage");  // لو مفيش بيانات
  }
  this.getCartTotal()
}


minusAmount(i : number){
  this.cartProduct[i].quantitiy--
  localStorage.setItem("cart", JSON.stringify(this.cartProduct)); 
  this.getCartTotal()
}

addAmount(i : number){
  this.cartProduct[i].quantitiy++
  localStorage.setItem("cart", JSON.stringify(this.cartProduct)); 
  this.getCartTotal()
}

detectChange(){
  localStorage.setItem("cart", JSON.stringify(this.cartProduct)); 
}

removeFromCart(i:number){
  this.cartProduct.splice(i ,1)
  localStorage.setItem("cart", JSON.stringify(this.cartProduct)); 

}

// addCart(){
//   let Model = {
//     userId:5,
//     date:new Date();
//     products:
//   }
// }

getCartTotal(){
  this.total=0
  for(let x in this.cartProduct){
    this.total += this.cartProduct[x].item.price * this.cartProduct[x].quantitiy;
  }
}
}
