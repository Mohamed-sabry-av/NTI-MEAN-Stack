import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  standalone: false,
  
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  @Input() isVisible: boolean = false; // للتحكم في عرض المودال
  @Input() title: string = 'Confirm Action'; // عنوان المودال
  @Input() message: string = 'Are you sure you want to proceed?'; // الرسالة

  @Output() confirm = new EventEmitter<boolean>(); // يرسل قيمة عند التأكيد أو الإلغاء

  closeDialog(result: boolean): void {
    this.isVisible = false; // إخفاء المودال
    this.confirm.emit(result); // إرسال النتيجة
  }
}
