import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyProject';
  isDashboardPage = false;

  constructor(private router: Router) {
    // استمع لتغيرات التوجيه
    this.router.events.subscribe(() => {
      // تحقق من إذا كانت الصفحة الحالية هي Dashboard
      this.isDashboardPage = this.router.url === '/dashboard';
    });
  }
}
