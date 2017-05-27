import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { RedirectAuthenticatedGuard } from './redirect-authenticated.guard';


export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent, canActivate: [RedirectAuthenticatedGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [RedirectAuthenticatedGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
