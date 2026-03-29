import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { RestorantMenuPage } from './pages/restorant-menu-page/restorant-menu-page';
import { LoginPage } from './pages/login-page/login-page';
import { FixedLayout } from './layouts/fixed-layout/fixed-layout';
import { LogedPaged } from './pages/loged-paged/loged-paged';
import { RegisterPage } from './pages/register-page/register-page';
import { EditRestaurantPage } from './pages/edit-restaurant-page/edit-restaurant-page';
import { CreateAndEditProductPage } from './pages/create-and-edit-product-page/create-and-edit-product-page';
import { onlyPublicGuard } from './guards/only-public-guard';
import { MenuItemPage } from './pages/menu-item-page/menu-item-page';

export const routes: Routes = [
    {
        path: "",
        component: FixedLayout,
        children: [
            {
                path: "",
                component: HomePage,
                canActivate: [onlyPublicGuard]
            },
            {
                path: "restaurant/:idRestaurant",
                component: RestorantMenuPage
            },
            {
                path: "login",
                component: LoginPage,
                canActivate: [onlyPublicGuard]
            },
            {
                path: "register",
                component: RegisterPage,
                canActivate: [onlyPublicGuard]
            },
            {
                path: "loged",
                component: LogedPaged,
            },
            {
                path: "editRestaurant",
                component: EditRestaurantPage
            }
            ,
            {
                path: "createProduct",
                component: CreateAndEditProductPage
            },
            {
                path: "products/:idProducto/edit",
                component: CreateAndEditProductPage
            },
            {
                path: "menu-item-page/:restaurantId/:id",
                component: MenuItemPage
            }
                
            
            
        ]
    }


];

