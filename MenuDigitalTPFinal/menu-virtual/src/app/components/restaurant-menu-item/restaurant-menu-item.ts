import { Component, inject, input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { ProductsService } from '../../services/products-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Restaurant } from '../../interfaces/restaurant';

@Component({
  selector: 'app-restaurant-menu-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './restaurant-menu-item.html',
  styleUrl: './restaurant-menu-item.scss'
})
export class RestaurantMenuItem {
  index = input<number>();
  product = input.required<any>()
  producto: Product | undefined;
  authService = inject(AuthService)
  productService = inject(ProductsService);
  route = inject(ActivatedRoute)

  restaurant = input.required<Restaurant>();

  //restaurant: Restaurant|undefined;
  // async ngOnInit(){
  //   this.producto = await this.productService.getProductById()
  // }

  getDiscountedPrice(product: any): number {
  if (!this.restaurant().happyHour || product.discount === 0) {
    return product.price;
  }

  const discountAmount = product.price * (product.discount / 100);
  return product.price - discountAmount;
}

  async deleteProduct(id: number|string){
    
    await this.productService.deleteProduct(id)
  }
}
