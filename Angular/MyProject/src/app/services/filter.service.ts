import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<any>({});
  filters$ = this.filtersSubject.asObservable();

  updateFilters(filters: any) {
    this.filtersSubject.next(filters);  // التحديث هنا يرسل الفلاتر المحدثة لجميع المشتركين
  }
}
