import { Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';

export interface NavRoute extends Route {
    path?: string;
    icon?: string;
    group?: string;
    groupedNavRoutes?: NavRoute[];
}

export const sideNavPath = 'admin';

export const navRoutes: NavRoute[] = [
    {
        data: { title: 'Dashboard' },
        icon: 'dashboard',
        group: '',
        path: 'dashboard',
        loadChildren: () =>
            import('./pages/dashboard-page/dashboard-page.module').then(
                m => m.DashboardPageModule,
            ),
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },

    {
        data: { title: 'Inventory' },
        icon: 'menu_book',
        group: '',
        path: 'inventory',
        loadChildren: () =>
            import('./pages/inventory-page/inventory-page.module').then(
                m => m.InventoryPageModule,
            ),
    },
    {
        data: { title: 'Borrow and Return' },
        icon: 'sync_alt',
        group: '',
        path: 'borrow-return',
        loadChildren: () =>
            import('./pages/borrow-return-page/borrow-return-page.module').then(
                m => m.BorrowReturnPageModule,
            ),
    },
    {
        data: { title: 'Borrower Information ' },
        icon: 'transfer_within_a_station',
        group: '',
        path: 'borrower-info',
        loadChildren: () =>
            import('./pages/borrower-info-page/borrower-info-page.module').then(
                m => m.BorrowerInfoPageModule,
            ),
    },
    {
        data: { title: 'Reports' },
        icon: 'insert_chart',
        group: '',
        path: 'reports',
        loadChildren: () =>
            import('./pages/reports-page/reports-page.module').then(
                m => m.ReportsPageModule,
            ),
    },
];

@Injectable({
    providedIn: 'root',
})
export class NavRouteService {
    navRoute: Route;
    navRoutes: NavRoute[];

    constructor(router: Router) {
        this.navRoute = router.config.find(route => route.path === sideNavPath);
        this.navRoutes = this.navRoute.children
            .filter(route => route.data && route.data.title)
            .reduce((groupedList: NavRoute[], route: NavRoute) => {
                if (route.group) {
                    const group: NavRoute = groupedList.find(navRoute => {
                        return (
                            navRoute.group === route.group &&
                            navRoute.groupedNavRoutes !== undefined
                        );
                    });
                    if (group) {
                        group.groupedNavRoutes.push(route);
                    } else {
                        groupedList.push({
                            group: route.group,
                            groupedNavRoutes: [route],
                        });
                    }
                } else {
                    groupedList.push(route);
                }
                return groupedList;
            }, []);
    }

    public getNavRoutes(): NavRoute[] {
        return this.navRoutes;
    }
}
