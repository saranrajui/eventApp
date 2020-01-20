import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListingComponent } from './user-listing/user-listing/user-listing.component';

export const UserRoutes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'user-list',
    },
    {
        path: 'user-list', component: UserListingComponent, data : { breadCrumb : 'User List'}
    }
];
export const UserRoute: ModuleWithProviders = RouterModule.forRoot(UserRoutes);
