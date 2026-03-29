import { Component, inject, input } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../interfaces/product';
import { Restaurant } from '../../interfaces/restaurant';
import { JsonPipe } from '@angular/common';
import { RestaurantService } from '../../services/restaurant-service';

@Component({
  selector: 'app-menu-item-page',
  imports: [RouterLink,JsonPipe],
  templateUrl: './menu-item-page.html',
  styleUrl: './menu-item-page.scss'
})
export class MenuItemPage {
  authService = inject(AuthService)
  productService = inject(ProductsService)
  restaurantService = inject(RestaurantService)
  
  id = input.required<string>()
  producto: Product | null = null;
  restaurant: Restaurant | undefined;
  cargandoProducto = false;

  restaurantId = input.required<string>();

  route = inject(ActivatedRoute)

  async ngOnInit() {
    this.restaurant = await this.restaurantService.getRestaurantById(parseInt(this.restaurantId()));
    this.producto = await this.productService.getProductById(this.id());
  }

  // async ngOnInit() {
  //   if (this.idProducto()) {
  //     this.producto = this.productService.products.find(producto => producto.id.toString() === this.idProducto());
  //     if (!this.producto) this.cargandoProducto = true;
  //     const res = await this.productService.getProductById(this.idProducto());
  //     if (res) this.producto = res;
  //     this.cargandoProducto = false;
  //   }
  // }


  async deleteProduct(id: number | string) {

    await this.productService.deleteProduct(id)
  }

  getDiscountedPrice(product: Product): number {
  if (!this.restaurant?.happyHour || product.descuento === 0) {
    return parseFloat(product.price);
  }

  const discountAmount = parseFloat(product.price) * (product.descuento / 100);
  return parseFloat(product.price) - discountAmount;
}
}
