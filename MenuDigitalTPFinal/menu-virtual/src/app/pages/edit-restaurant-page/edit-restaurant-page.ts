import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { RestaurantForEdit } from '../../interfaces/restaurant';

@Component({
  selector: 'app-edit-restaurant-page',
  imports: [FormsModule],
  templateUrl: './edit-restaurant-page.html',
  styleUrl: './edit-restaurant-page.scss'
})
export class EditRestaurantPage {
  isLoading = false;
  errorRegister = false;

  restaurantService = inject(RestaurantService);
  authService = inject(AuthService);
  router = inject(Router)

  restaurant: any;

  ngOnInit() {
    
    this.restaurant = this.restaurantService.restaurant;
  }


  async editRestaurant(form: RestaurantForEdit) {
    this.errorRegister = false;
    if (
      !form.firstName ||
      !form.lastName ||
      !form.localName ||
      !form.imageUrl ||
      !form.bioImageUrl ||
      !form.description ||
      !form.email ||
      !form.password 
      // !form.password2 ||
      // form.password !== form.password2

    ) {
      this.errorRegister = true;
      return;
    }
    console.log(this.restaurantService.restaurant.id)
    this.isLoading = true;
    const ok = await this.restaurantService.editRestarant(this.restaurantService.restaurant.id,{
      firstName: form.firstName,
      lastName: form.lastName,
      localName: form.localName,
      description: form.description,
      imageUrl: form.imageUrl,
      bioImageUrl: form.bioImageUrl,
      email: form.email,
      password: form.password,

    });
    
    this.isLoading = false;
    if (ok) this.router.navigate(["/loged"]);

    if (!ok) {
      this.errorRegister = true;
    }

  }

  async deleteRestaurant(id: number){
    await this.restaurantService.deleteRestaurant(id);
    this.authService.logout();
    this.router.navigate(["/"])
  }
}

