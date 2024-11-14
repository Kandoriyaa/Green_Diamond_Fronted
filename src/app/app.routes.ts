import { Routes } from '@angular/router';
import { MainLayoutComponent } from './theme/layouts/main-layout/main-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login', loadComponent: () =>
            import('./demo/authentication/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [

            {   
                path: 'dashboard',
                loadComponent: () => import('./demo/dashboard/dashboard.component').then((c) => c.DashboardComponent),
                data: { breadcrumb: 'Dashboard' }
            },
        ]
    },
    { path: 'ui-componet', redirectTo: '/ui-componet/class-of-trade/list', pathMatch: 'full' },
    {
        path: 'ui-componet',
        component: MainLayoutComponent,
        children: [
            //class-of-trade
            {
                path: 'class-of-trade/list',
                loadComponent: () => import('./demo/ui-component/class-of-trade/class-of-trade-list/class-of-trade-list.component').then((c) => c.ClassOfTradeListComponent),
                data: { breadcrumb: 'Class Of Trade' },
            },
            // {
            //     path: 'class-of-trade/add',
            //     loadComponent: () => import('./demo/ui-component/class-of-trade/class-of-trade-add/class-of-trade-add.component').then((c) => c.ClassOfTradeAddComponent),
            //     data: { breadcrumb: 'class of trade Add' }
            // },
            // {
            //     path: 'class-of-trade/edit',
            //     loadComponent: () => import('./demo/ui-component/class-of-trade/class-of-trade-add/class-of-trade-add.component').then((c) => c.ClassOfTradeAddComponent),
            //     data: { breadcrumb: 'class of trade Edit' }
            // },
            //clothe-display
            {
                path: 'clothe-display/list',
                loadComponent: () => import('./demo/ui-component/clothe-display/clothe-display-list/clothe-display-list.component').then((c) => c.ClotheDisplayListComponent),
                data: { breadcrumb: 'clothe display' },
            },
            {
                path: 'clothe-display/add',
                loadComponent: () => import('./demo/ui-component/clothe-display/clothe-display-add/clothe-display-add.component').then((c) => c.ClotheDisplayAddComponent),
                data: { breadcrumb: 'Clothe Display Add' }
            },
            {
                path: 'clothe-display/edit',
                loadComponent: () => import('./demo/ui-component/clothe-display/clothe-display-add/clothe-display-add.component').then((c) => c.ClotheDisplayAddComponent),
                data: { breadcrumb: 'Clothe Display Edit' }
            },
            //typography
            {
                path: 'typography/list',
                loadComponent: () => import('./demo/ui-component/typography/typography.component').then((c) => c.TypographyComponent),
                data: { breadcrumb: 'typography' },
            },
            {
                path: 'ui-color/list',
                loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component').then((c) => c.UiColorComponent),
                data: { breadcrumb: 'ui-colo' }
            },

        ]
    },
    { path: 'other', redirectTo: 'sample-page/list', pathMatch: 'full' },
    {
        path: 'other',
        component: MainLayoutComponent,
        children: [
            {
                path: 'sample-page',
                loadComponent: () => import('./demo/other/sample-page/sample-page.component').then((c) => c.default)
            },

        ]
    },
    { path: 'customer', redirectTo: 'customer/list', pathMatch: 'full' },
    {
        path: 'customer',
        component: MainLayoutComponent,
        children: [
            {
                path: 'list',
                loadComponent: () => import('./demo/customer/customer-list/customer.component').then((c) => c.CustomerComponent)
            },
            {
                path: 'add',
                loadComponent: () => import('./demo/customer/customer-add/customer-add.component').then((c) => c.CustomerAddComponent)
            },
        ]
    }
];
