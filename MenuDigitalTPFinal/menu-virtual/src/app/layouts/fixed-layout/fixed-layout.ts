import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { Theme } from '../../services/theme';
import { RestaurantService } from '../../services/restaurant-service';

@Component({
  selector: 'app-fixed-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './fixed-layout.html',
  styleUrl: './fixed-layout.scss'
})
export class FixedLayout {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('arrow') toggleArrow!: ElementRef;
  isOpen = false;
  
  auth = inject(AuthService);
  restaurantService = inject(RestaurantService)
  handleNavigate(){
    if(this.auth.isLoggedIn){
      this.router.navigate(['/loged']);
    }else{
      this.router.navigate(['/'])
    }
  }



  router = inject(Router);

  isLoginPage = false;



  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url.includes('login');
    });
  }
  handleAuthButton() {
    // Si está logeado entonces logout
    if (this.auth.isLoggedIn) {
      this.auth.logout();
      this.router.navigate(['/']);
      return;
    }
    // Si NO está logeado entonces login / register según la página
    if (this.isLoginPage) {
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/login']);
    }

    
  }


  theme = inject(Theme)

  changeTheme(event: any) {
    const value = event.target.value;
    this.theme.setTheme(value);
  }


  
}
