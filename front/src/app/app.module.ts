import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MaterialModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { RedirectAuthenticatedGuard } from './redirect-authenticated.guard';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile/profile.component';
import { UpdateInfoModal } from './profile/profile.component';
import { UpdateImageModal } from './profile/profile.component';
import { NavMainComponent } from './nav-main/nav-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFacebookComponent } from './login-facebook/login-facebook.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    HomeComponent,
    UpdateInfoModal,
    UpdateImageModal,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavMainComponent,
    LoginFacebookComponent,
    ChatComponent
  ],
  entryComponents: [
    UpdateInfoModal,
    UpdateImageModal
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MaterialModule,
    BrowserAnimationsModule,
    routes
  ],
  providers: [AuthGuard, RedirectAuthenticatedGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
