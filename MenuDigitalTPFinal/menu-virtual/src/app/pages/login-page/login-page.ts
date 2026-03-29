import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  authService = inject(AuthService)
  router = inject(Router)

  error = false;
  loading = false;

  async  login(form:NgForm){
    if (!form.value.email || !form.value.password) {
      this.error = true;
      return;
    }

    this.loading = true;
    const res = await this.authService.login(form.value);
    this.loading = false;
    if(true) this.router.navigate(["/loged"]);
    this.error = true;
  }
}
