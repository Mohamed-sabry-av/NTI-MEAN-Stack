import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: false,
  
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit{
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Input() isVisible: boolean = false;

  ngOnInit(): void {}

  closeAlert(): void {
    this.isVisible = false;
  }
}
