import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private authServive:AuthorizationService,
              private router:Router
  ){}
  logout(){
    this.authServive.logout();
    this.router.navigate(['auth']);
  }

}
