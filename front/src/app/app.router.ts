import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddPicturesComponent } from './add-pictures/add-pictures.component';
import { GalleryComponent } from './gallery/gallery.component';


export const router: Routes = [
    { path: '',redirectTo: 'home', pathMatch: 'full'},
    { path: 'home',component: HomeComponent},
    { path: 'add_pictures',component: AddPicturesComponent},
    { path: 'gallery',component: GalleryComponent},
];

export const routes:ModuleWithProviders = RouterModule.forRoot(router);