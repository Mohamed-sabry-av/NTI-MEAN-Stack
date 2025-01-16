import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(private _authS:AuthService,private _router: Router){}
    isLoggedIn = false
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
}
