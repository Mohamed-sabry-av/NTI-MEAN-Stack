import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private categoryFilters = new BehaviorSubject<string[]>([]);
  categoryFilters$ = this.categoryFilters.asObservable();

  addCategoryFilter(categoryId: string): void {
    const filters = [...this.categoryFilters.getValue()];
    if (!filters.includes(categoryId)) {
      filters.push(categoryId);
      this.categoryFilters.next(filters);
      console.log('Category added:', filters);
    }
  }
  
  removeCategoryFilter(categoryId: string): void {
    const filters = [...this.categoryFilters.getValue()];
    const updatedFilters = filters.filter((id) => id !== categoryId);
    this.categoryFilters.next(updatedFilters);
    console.log('Category removed:', updatedFilters);
  }
  
}
