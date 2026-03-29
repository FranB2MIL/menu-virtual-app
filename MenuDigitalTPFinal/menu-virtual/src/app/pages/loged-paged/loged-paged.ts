import { Component, inject, input } from '@angular/core';
import { RestaurantService } from '../../services/restaurant-service';
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantMenuItem } from "../../components/restaurant-menu-item/restaurant-menu-item";
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products-service';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Categories } from "../../components/categories/categories";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loged-paged',
  imports: [RouterLink, CommonModule, Categories, RestaurantMenuItem, FormsModule],
  templateUrl: './loged-paged.html',
  styleUrl: './loged-paged.scss'
})
export class LogedPaged {
  index = input.required<number>();
  restaurantService = inject(RestaurantService);
  authService = inject(AuthService);
  productsService = inject(ProductsService);
  route = inject(Router)

  restaurant: any;


  products: any[] | undefined = [];
  async ngOnInit() {
    this.restaurant = await this.restaurantService.getMyRestaurant();
    await this.productsService.getProducts(this.restaurant?.id); // <- UNA SOLA LLAMADA aquí
    console.log('Products fetched:', this.productsService.products);

    console.log("Valor que vuelve del backend:", this.restaurant?.happyHour);
    
  }
  // async getProducts(){
  //   const products = await this.productsService.getProducts();
  //   this.products = products || []
  // }

  logout() {
    this.authService.logout()
  }

  // selectedCategoryId: number | null = null;

  // async filterByCategory(categoryId: number) {

  //   if (this.selectedCategoryId === categoryId) {
  //     this.selectedCategoryId = null;
  //     const res = await this.productsService.getProducts(Number(this.authService.userId));
  //     this.products = res
  //     return;
  //   }
  //   this.selectedCategoryId = categoryId;
  //   const res = await this.productsService.getRestaurantProductsByCategory(Number(this.authService.userId), categoryId);
  //   this.products = res
  //   return;
  // }
  async toggleHappyHour() {
    await this.restaurantService.updateHappyHour(Number(this.restaurant!.id), this.restaurant!.happyHour);
  }
}
