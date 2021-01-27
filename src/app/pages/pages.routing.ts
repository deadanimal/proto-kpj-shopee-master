import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { EPriscriptionComponent } from './e-priscription/e-priscription.component';

export const PagesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'notification',
                component: NotificationComponent
            },
            {
                path: 'checkout',
                component: CheckoutComponent
            },
            {
                path: 'cart',
                component: CartComponent
            },
            {
                path: 'e-priscription',
                component: EPriscriptionComponent
            },

        ]
    }
]