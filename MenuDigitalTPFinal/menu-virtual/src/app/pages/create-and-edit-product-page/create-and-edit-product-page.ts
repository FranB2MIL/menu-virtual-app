import { Component, inject, input, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ProductsService } from '../../services/products-service';
import { Product, NewProduct } from '../../interfaces/product';
import { CategoriesService } from '../../services/categories-service';
import { RestaurantService } from '../../services/restaurant-service';
import { Categories } from "../../components/categories/categories";

@Component({
  selector: 'app-create-and-edit-product-page',
  imports: [RouterModule, FormsModule, Categories],
  templateUrl: './create-and-edit-product-page.html',
  styleUrl: './create-and-edit-product-page.scss'
})
export class CreateAndEditProductPage {
  authService = inject(AuthService)
  productService = inject(ProductsService)
  router = inject(Router)
  errorEnBack = false;
  idProducto = input<string>();
  productoBack: Product | undefined = undefined;
  form = viewChild<NgForm>("newProductForm")
  solicitudABackEnCurso = false;

  categories: any[] = [];
  creatingCategory = false;
  selectedCategoryId: number | null = null;
  
  restaurantService = inject(RestaurantService);
  restaurant: any;
  categoryService = inject(CategoriesService);
  
  async ngOnInit() {
    this.loadCategories();
    console.log("Imagen recibida:", this.productoBack?.imageUrl);
    console.log("ID PRODUCTO:", this.idProducto());
    if (this.idProducto()) {
      const producto: Product | null = await this.productService.getProductById(this.idProducto()!);
      console.log(producto);
      if (producto) {
        this.productoBack = producto;
        console.log("FORM CONTROLS:", this.form()?.controls);
        this.form()?.setValue({
          name: producto.name,
          description: producto.description,
          descuento: producto.descuento,
          price: producto.price,
          imageUrl: producto.imageUrl,
          categoryId: producto.categoryId
        })
      }
    }
  }
  
  
  async loadCategories(){
    this.restaurant = await this.restaurantService.getMyRestaurant()
    this.restaurantService.getRestaurantCategories(this.restaurant.id)
  }
  
  
  async handleFormSubmission(form: any) {
    this.errorEnBack = false;
    const newProduct: NewProduct = {
      name: form.name,
      description: form.description,
      descuento: form.descuento,
      price: form.price,
      imageUrl: form.imageUrl,
      categoryId: Number(form.categoryId)
    }
    console.log(form.imageUrl)
    this.solicitudABackEnCurso = true;
    let res;
    if(this.idProducto()){
      res = await this.productService.editProduct({
        ...newProduct, id: this.productoBack!.id,
        
      })
    }else{
      res = await this.productService.createProduct(newProduct)
    }
    this.solicitudABackEnCurso = false;

    if(!res){
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/loged"])
  }
}
