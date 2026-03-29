import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantService } from '../../services/restaurant-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss']
})
export class HomePage {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('arrow') toggleArrow!: ElementRef;
  isOpen = false;

  restaurantService = inject(RestaurantService)
  router = inject(Router)

  toggleDropdown() {
    this.dropdown.nativeElement.classList.toggle('show');
    this.toggleArrow.nativeElement.classList.toggle('arrow');
  }
  

  restaurants: any[] = []
  
  async ngOnInit() {
    this.restaurants = await this.restaurantService.getRestaurants();
    console.log(this.restaurants)
  }

  
}
