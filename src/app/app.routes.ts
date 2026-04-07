import { NgModel } from '@angular/forms';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/main/home/home.component';
import { StoreComponent } from './pages/products/store/store.component';
import { AboutComponent } from './pages/main/about/about.component';
import { ContactComponent } from './pages/main/contact/contact.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { CartComponent } from './pages/products/cart/cart.component';
import { LikedComponent } from './pages/products/liked/liked.component';
import { authGuard } from './interceptors/auth.guard';
import { UserOrdersComponent } from './pages/account/user-orders/user-orders.component';
import { ProfileSettingsComponent } from './pages/account/profile-settings/profile-settings.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'store', component: StoreComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    {path: 'profile', component: ProfileComponent},
    {path: 'cart', component: CartComponent},
    {path: 'liked', component: LikedComponent},
    { path: 'profile', 
        component: ProfileComponent, 
        canActivate: [authGuard],
        children: [
            { path: 'settings', component: ProfileSettingsComponent },
            { path: 'orders', component: UserOrdersComponent }
        ]
    },
    
    {path: 'product/:id', component: ProductDetailComponent},
];
