import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: false,
  
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any; 
  @Output() item = new EventEmitter()
  @Output() liked = new EventEmitter<any>(); 


  addButton:boolean = false;
  amount:number = 0

  get fullStars(){
    return Array(Math.floor(this.product.rating))
  }
  
  get hasHalfStat(){
    return this.product.rating % 1 !==0
  }

  add(){
    this.item.emit({item:this.product,quantitiy:this.amount})
  }
  
  likedProduct():void{
    this.liked.emit(this.product)
  }
  
}
