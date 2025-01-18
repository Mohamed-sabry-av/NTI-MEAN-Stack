import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  users!:User[]
  numberOfUser!:Number;
  numberOfOrders!:Number;
  numberOfProducts!:Number;
 constructor(private userService:UserService,
  private orderService:OrderService,
  private productService:ProductService
 ){}
  ngOnInit(): void {
   this.userService.getUsers().subscribe((response)=>{
    console.log("response");
    console.log(response);
    this.users=response.data;
    this.numberOfUser=this.users.length;
   })
   this.orderService.getNumberOfOrders().subscribe((response)=>{
    console.log(response)
    this.numberOfOrders=response.data.length;
   })
   this.productService.getProducts().subscribe((response)=>{
    console.log(response)
    this.numberOfProducts=response.data.length;
   })
  }

}
