import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone:false,
  selector: 'app-delivery-details-dialog',
  templateUrl: './delivery-details-dialog.component.html',
})
export class DeliveryDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeliveryDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { deliveryFee: number; deliveryDays: number }
  ) {}
}
