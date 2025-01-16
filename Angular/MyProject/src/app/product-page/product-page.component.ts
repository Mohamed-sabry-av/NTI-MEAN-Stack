import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-page',
  standalone: false,
  
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{
  id:any
  data:any={}
  loading:boolean = false;

  constructor(private route:ActivatedRoute, private service:ProductsService){
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
  }

  getProduct(){
    this.loading = true;
    this.service.getProductById(this.id).subscribe(res=>{
      this.data = res
      this.loading = false;
      console.log(this.data = res)
    },error=>{
      this.loading = false
      console.log(error)
    })
  }

  
  
  ngOnInit(): void {
    this.getProduct()
  }
  
  currentImageIndex = 0;
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedSize: string | null = null;
  isInWishlist = false;
  
  setImage(index: number): void {
    this.currentImageIndex = index;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addToCart(): void {
    if (!this.selectedSize) {
      alert('Please select a size before adding to cart');
      return;
    }
    // Add to cart logic here
    alert(`Added to cart with size: ${this.selectedSize}`);
  }

  toggleWishlist(): void {
    this.isInWishlist = !this.isInWishlist;
    const message = this.isInWishlist ? 'Added to wishlist' : 'Removed from wishlist';
    alert(message);
  }
}
  // product = {
  //   name: "boy-jacket",
  //   details: "Good-white-long-jacket-looks-cute",
  //   price: 1123,
  //   discount: 15,
  //   rating: 1.2,
  //   categoryId: "677c79691c9d11576b5ed377"
  // };

  // images = [
  //   "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
  //   "https://images.unsplash.com/photo-1578932750294-f5075e85f44a",
  //   "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
  //   "https://images.unsplash.com/photo-1578932750294-f5075e85f44a"
  // ];


  // nextImage(): void {
  //   this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  // }

  // prevImage(): void {
  //   this.currentImageIndex = this.currentImageIndex === 0 ? 
  //     this.images.length - 1 : this.currentImageIndex - 1;
  // }

  // calculateDiscountedPrice(): number {
  //   const discount = this.product.price * (this.product.discount / 100);
  //   return Math.round(this.product.price - discount);
  // }

