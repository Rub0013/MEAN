import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { AppComponent } from './app.component';
import { AddPicturesComponent } from './add-pictures/add-pictures.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile/profile.component';
import { UpdateInfoModal } from './profile/profile.component';
import { UpdateImageModal } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    AddPicturesComponent,
    GalleryComponent,
    HomeComponent,
    UpdateInfoModal,
    UpdateImageModal,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  entryComponents: [
    UpdateInfoModal,
    UpdateImageModal
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MaterialModule,
    routes
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
