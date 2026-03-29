import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { Category, NewCategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  authService = inject(AuthService);

  readonly URL_BASE = "https://localhost:7227/api/category";
  categories: Category[] = []

  async createCategory(nuevaCategoria: NewCategory) {
    
    const res = await fetch(this.URL_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(nuevaCategoria),
    });
    if (res.ok) {
      const category = await res.json()
      this.categories.push(category)
      return category;
    } else {
      return null;
    }
  }

  async deleteCategory(id: number){
    const res = await fetch(this.URL_BASE + "/" + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      // body: JSON.stringify(id)
    });
    this.categories = this.categories.filter(category => category.id !== id);
  }
}
