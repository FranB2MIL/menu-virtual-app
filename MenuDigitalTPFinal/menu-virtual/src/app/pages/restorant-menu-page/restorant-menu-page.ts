import { Component, inject, effect } from '@angular/core';
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantService } from '../../services/restaurant-service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HomePage } from '../home-page/home-page';
import { Categories } from "../../components/categories/categories";
import { ProductsService } from '../../services/products-service';
import { RestaurantMenuItem } from "../../components/restaurant-menu-item/restaurant-menu-item";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-restorant-menu-page',
  imports: [CommonModule, Categories, RestaurantMenuItem],
  templateUrl: './restorant-menu-page.html',
  styleUrl: './restorant-menu-page.scss'
})
export class RestorantMenuPage {
  restaurantService = inject(RestaurantService);
  route = inject(ActivatedRoute);
  productService = inject(ProductsService)
  authService = inject(AuthService)

  restaurant: any;
  selectedCategoryId: number | null = null;

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('idRestaurant'));
    console.log(id);
    if (id) {
      this.restaurant = await this.restaurantService.getRestaurantById(id);
      console.log(this.restaurant);
      await this.productService.getProducts(id);
      return this.restaurant;

    }
  }
  async filterByCategory(categoryId: number) {
    const userId = Number(this.route.snapshot.paramMap.get('idRestaurant'));
    if (this.selectedCategoryId === categoryId) {
      this.selectedCategoryId = null;
      const res = await this.productService.getProducts(userId);
      return;
    }
    this.selectedCategoryId = categoryId;
    const res = await this.productService.getRestaurantProductsByCategory(userId, categoryId);
  }
}