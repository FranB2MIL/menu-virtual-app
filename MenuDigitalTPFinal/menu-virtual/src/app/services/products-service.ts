import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { NewProduct, Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  authService = inject(AuthService);

  readonly URL_BASE = "https://localhost:7227/api/product";
  products: any[] = []

  async createProduct(nuevoProducto: NewProduct) {
    console.log("nuevoprod", nuevoProducto);
    console.log("JSON stringify:", JSON.stringify(nuevoProducto));
    const res = await fetch('https://localhost:7227/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(nuevoProducto),
    });
    if (res.ok) {
      const product = await res.json()
      this.products.push(product)
      return product;
    } else {
      return null;
    }
  }

  async editProduct(product: Product) {
    const res = await fetch(this.URL_BASE + "/" + product.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(product)
      });
    if (!res.ok) return;
    this.products = this.products.map(oldProduct => {
      if (oldProduct.id === product.id) return product;
      return oldProduct
    })
    return product;
  }


  async deleteProduct(id: number|string) {
    const res = await fetch('https://localhost:7227/api/product' + "/" + id
      , {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(id)
      }
    );
    this.products = this.products.filter(producto => producto.id !== id);
  }

  async getProducts(id: number | undefined) {

    const res = await fetch('https://localhost:7227/api/product/all/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //Authorization: 'Bearer ' + this.authService.token
      },
    })
    if (res.ok) {
      console.log("yay")
      this.products = await res.json();
      return this.products;
    }
    console.log("oh oh")
    return
  }
  async getProductById(id: string | number) {
    const res = await fetch(this.URL_BASE + "/" + id,
      {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          //Authorization: 'Bearer ' + this.authService.token
        },
      })
    if (res.ok) {
      const resJson: Product = await res.json();
      return resJson;
    }
    return null
  }

  async getRestaurantProductsByCategory(id: number, categoryId: number) {
    const res = await fetch('https://localhost:7227/api/User/' + id + '/category/' + categoryId + '/product', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      console.log("yay")
      this.products = await res.json();
      return this.products;
    }
    console.log("oh oh")
    return
  }
}
