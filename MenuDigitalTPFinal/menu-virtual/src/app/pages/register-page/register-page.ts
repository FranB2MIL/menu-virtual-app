import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RestaurantService } from '../../services/restaurant-service';
import { AuthService } from '../../services/auth-service';
import { FormRestaurant } from '../../interfaces/restaurant';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  isLoading = false;
  errorRegister = false;

  restaurantService = inject(RestaurantService);
  authService = inject(AuthService);
  router = inject(Router)

  async register(form: FormRestaurant) {
    this.errorRegister = false;
    if (
      !form.firstName ||
      !form.lastName ||
      !form.localName ||
      !form.email ||
      !form.password 
      // !form.password2 ||
      // form.password !== form.password2
      
    ) {
      this.errorRegister = true;
      return;
    }

    this.isLoading = true;
    const ok = await this.restaurantService.register({
      firstName: form.firstName,
      lastName: form.lastName,
      localName: form.localName,
      email: form.email,
      password: form.password,
      description: '',
      
    });
    this.isLoading = false;
    if(ok) this.router.navigate(["/login"]);

    if (!ok) {
      this.errorRegister = true;
    }
    
  }
}
