import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriesService } from '../../services/categories-service';
import { RestaurantService } from '../../services/restaurant-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, NewCategory } from '../../interfaces/category';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  categories: any[] = [];
  newCategoryName = '';
  showCreate = false;
  showCreate2 = false;
  isLoged = false;


  route = inject(ActivatedRoute);
  authService = inject(AuthService)
  categoryService = inject(CategoriesService);
  restaurantService = inject(RestaurantService);
  form = viewChild<NgForm>("newCategoryForm")

  

  restaurant: any;
  @Input() restaurantId!: number;

  async ngOnInit() {
    this.isLoged = this.authService.isLoggedIn;
    const id = Number(this.route.snapshot.paramMap.get('idRestaurant'));
    if (id) {
      this.restaurant = await this.restaurantService.getRestaurantById(id);
    } else {
      console.log("entro aca")
      this.restaurant = await this.restaurantService.getMyRestaurant();
    }
    console.log(this.restaurant.id)
    await this.loadCategories();
  }

  async loadCategories() {
    const categories = await this.restaurantService.getRestaurantCategories(this.restaurant.id);
    this.categories = categories || []; // Si no hay categorías, asigna un array vacío
    console.log("Categorías recibidas:", this.categories); // Verifica en la consola
  }

  async createCategory(form: any) {

    const newCategory: NewCategory = {
      name: form.name,
      userId: this.restaurant.id
    }
    this.categories.push(newCategory)
    await this.categoryService.createCategory(newCategory)
  }
  async deleteCategory(formValue: any){
    const id = Number(formValue.id);
    await this.categoryService.deleteCategory(id);
    this.categories = this.categories.filter(category => category.id !== id);
  }

  cancel() {
    this.showCreate = false;
    this.showCreate2 = false;
  }


  @Output() onCategorySelected = new EventEmitter<number >();
  @Input() selectedCategoryId: number | null = null;

  selectCategory(categoryId: number) {
  this.onCategorySelected.emit(categoryId);
}
}
