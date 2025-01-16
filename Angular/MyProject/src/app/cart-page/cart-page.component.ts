import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartProduct:any=[]= []

  constructor(){}
  ngOnInit(): void {
    this.getCartProducts()
  }


getCartProducts(){
  if("cart" in localStorage){
    this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
}}
}
