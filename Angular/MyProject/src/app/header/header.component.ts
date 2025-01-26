import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LikedService } from '../services/liked.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoggedIn = false
  likedProductsCount:number =0

  constructor(private _authS:AuthService,private _router: Router,private likedProductsService:LikedService ){}
  ngOnInit(): void {
   this._authS.getAccessToken().subscribe(data => {
    if(data){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
   }
   )
  }

  logout(){
   
    this._router.navigate(['login'])
   this._authS.logout();
  }

  likedProduct(){
    this.likedProductsService.likedProducts$.subscribe((products: any[]) => {
      this.likedProductsCount = products.length; // تحديث العدد
    })
  }
}
