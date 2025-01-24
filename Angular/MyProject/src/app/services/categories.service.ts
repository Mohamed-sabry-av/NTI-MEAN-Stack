import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private database: DataBaseService) {}

  // استدعاء جميع التصنيفات من API
  getAllCategories(): Observable<any> {
    return this.database.getRequest<any>('productsCategory'); // جلب البيانات من الـ API
  }
  
  getCategoryById(id: any): Observable<any> {
    return this.database.getRequest('productsCategory/'+ id); // جلب تصنيف بناء على الـ ID
  }

  postCategory(category: any): Observable<any> {
    return this.database.postRequest('productsCategory', category); // إضافة تصنيف جديد
  }

  editCategory(id: any, data: any): Observable<any> {
    return this.database.editRequest('productsCategory', id, data); // تعديل تصنيف
  }

  deleteCategory(id: any): Observable<any> {
    return this.database.deleteRequest('productsCategory', id); // حذف تصنيف
  }
}
