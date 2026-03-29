import { inject, Injectable } from '@angular/core';
import { FormRestaurant, Restaurant, RestaurantForEdit } from '../interfaces/restaurant';
import { Product } from '../interfaces/product';
import { AuthService } from './auth-service';
import { Form } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurants: Restaurant[] = []

  // products: Product = {
  //   id: 1, name: "Whopper", details: "Hamburguesa con mayonesa, ketchup, cebolla, tomate, pepinos y lechuga", price: "5000", image: "https://bk-latam-prod.s3.amazonaws.com/sites/burgerking.com.do/files/WHOPPER.png", discount: 0
  // }

  authService = inject(AuthService);
  restaurant: any;

  products: Product[] = []

  async register(user: FormRestaurant) {
    const res = await fetch('https://localhost:7227/api/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      console.error('Error al registrar usuario:', await res.text());
    }

    return res.ok;
  }

  async editRestarant(userId: number, user: RestaurantForEdit) {

    const res = await fetch(`https://localhost:7227/api/User/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      console.error('Error al editar usuario:', await res.text());
    }
    console.log(res)
    return res.ok;
  }


  async getRestaurants() {
    const res = await fetch('https://localhost:7227/api/User', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
    })
    if (res.ok) {
      //this.restaurants = await res.json();
      console.log(res)
      return await res.json();
    }
  }
  async getMyRestaurant() {

    const token = localStorage.getItem('token'); // asumiend  o que guardaste el JWT al login
    const res = await fetch('https://localhost:7227/api/User/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.authService.token, // envías el token al backend
      },
    });
    console.log(res);
    if (res.ok) {
      const data = await res.json();  // ← leer UNA sola vez
      this.restaurant = data;
      console.log(data);
      return data;
      // console.log(this.restaurant)
    }
    return null;
  }

  async getRestaurantById(id: number) {


    const res = await fetch(`https://localhost:7227/api/User/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
    });
    //console.log(res);
    if (!res.ok) return null;

    // const data = await res.json();
    // this.restaurant = data;
    // console.log(data);
    return await res.json();
    // console.log(this.restaurant)

  }
  async getRestaurantCategories(id: number) {
    const res = await fetch(`https://localhost:7227/api/User/${id}/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) return null;


    return await res.json();
  }

  async updateHappyHour(userId: number, value: boolean) {
    const res = await fetch(`https://localhost:7227/api/User/${userId}/happy`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify({ happyHour: value }),
    });
    if (!res.ok) {
      console.error('Error al editar usuario:', await res.text());
    }
    console.log(res)
    return res.ok;
  }

  async deleteRestaurant(id: number){
    const res = await fetch(`https://localhost:7227/api/User/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
   
    if (!res.ok) return null;

    // const data = await res.json();
    // this.restaurant = data;
    // console.log(data);
    this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== id)
    return;
  }
}




