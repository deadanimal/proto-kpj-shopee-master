import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule, 
  TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routing';
import { HomeComponent } from './home/home.component';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RequestPrescriptionComponent } from './request-prescription/request-prescription.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NotificationComponent } from './notification/notification.component';
import { EPriscriptionComponent } from './e-priscription/e-priscription.component';

@NgModule({
  declarations: [HomeComponent, RequestPrescriptionComponent, CartComponent, CheckoutComponent, NotificationComponent, EPriscriptionComponent],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(PagesRoutes),
    CarouselModule.forRoot()
  ]
})
export class PagesModule { }
