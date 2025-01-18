import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog for modal
import { OrderDetailsDialog } from './order-details-dialog/order-details-dialog.component';
import { DeliveryDetailsDialogComponent } from './delivery-details-dialog/delivery-details-dialog.component';
import { Order } from '../../models/oder.model';

@Component({
  selector: 'app-orders-admin',
  standalone: false,
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent {
  orders: Order[] = [];
  filteredOrders: any[] = [];
  displayedColumns: string[] = ['id', 'customer', 'status', 'deliveryFee', 'placedOn', 'viewDetails']; // Added 'placedOn'
  statusOptions: string[] = ['pending', 'inProgress', 'shipped', 'delivered', 'cancelled'];
  selectedStatus: string = ''; // Track the selected status for filtering

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog  // Inject MatDialog for modal functionality
  ) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(response => {
      // Sort orders by createdAt in descending order (most recent first)
      this.orders = response.data.sort((a:any, b:any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      this.filteredOrders = [...this.orders]; // Initially, display all orders
    });
  }

  updateStatus(order: any) {
    this.orderService.updateOrderStatus(order._id, order.orderStatus).subscribe(() => {
      console.log('Status updated');
    });
  }

  filterOrders() {
    if (this.selectedStatus) {
      this.filteredOrders = this.orders
        .filter(order => order.orderStatus === this.selectedStatus)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      this.filteredOrders = [...this.orders]; // Show all orders (already sorted)
    }
  }

  cancelOrder(order: any) {
    if (confirm('Are you sure you want to cancel this order?')) {
      order.orderStatus = 'cancelled';
      this.updateStatus(order);
    }
  }

  // Open Order Details Modal
  viewOrderDetails(order: any) {
    const dialogRef = this.dialog.open(OrderDetailsDialog, {
      width: '600px',
      data: order  // Pass the order data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Optionally handle any result when the dialog is closed
    });
  }

  openDeliveryDetailsDialog(orderId: string): void {
    const dialogRef = this.dialog.open(DeliveryDetailsDialogComponent, {
      width: '400px',
      data: { deliveryFee: 0, deliveryDays: 0 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService
          .updateDeliveryDetails(orderId, result)
          .subscribe({
            next: () => alert('Delivery details updated successfully.'),
            error: (err) => console.error('Error updating delivery details:', err),
          });
      }
    });
  }

  validateDeliveryFee(order: any) {
    if (order.deliveryFee < 0) {
      order.deliveryFee = 0;  // Ensure no negative values
    }
  }
}