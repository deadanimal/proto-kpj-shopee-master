import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddNewPrescriptionComponent } from './add-new-prescription/add-new-prescription.component';
import { RequestPrescriptionComponent } from './request-prescription/request-prescription.component';
import { AdministrationUserComponent } from './administration-user/administration-user.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';

import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'user-management',
                component: UserManagementComponent
            },
            {
                path: 'product',
                children: [
                    {
                        path: 'product-management',
                        component: ProductManagementComponent
                    },
                    {
                        path: 'add-new-product',
                        component: AddNewProductComponent
                    },
                    {
                        path: 'product-list',
                        component: ProductListComponent
                    },
                    {
                        path: 'add-new-prescription',
                        component: AddNewPrescriptionComponent
                    },
                    {
                        path: 'request-prescription',
                        component: RequestPrescriptionComponent
                    },
                ]
            },
            {
                path: 'administration-user',
                component: AdministrationUserComponent
            },
            {
                path: 'customer-account',
                component: CustomerAccountComponent
            },
            {
                path: 'report',
                component: ReportComponent
            },


            {
                path: 'management',
                children: [
                    {
                        path: 'audit-trails',
                        component: ManagementAuditComponent
                    },
                    {
                        path: 'user',
                        component: ManagementUserComponent
                    }
                ]
            },
            
        ]
    }
]