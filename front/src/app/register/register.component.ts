import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ ],
})
export class RegisterComponent implements OnInit {

  pic: any;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  onChange(event) {
    const image = event.srcElement.files[0];
    if (image) {
      this.pic = image;
    } else {
      this.pic = null;
    }
  }

  register(form: any, event: Event) {
    event.preventDefault();
    const formData: any = new FormData();
    if (this.pic) {
      formData.append('userImage', this.pic);
    }
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.pass;
    const phone = form.value.phone;
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    this._authService.register(formData).subscribe(data => {
      if (data.success) {
        this._authService.localLogin(name, data.id, data.token);
        this._router.navigate(['home']);
      } else {
        console.log(data.errors);
      }
    });
    return false;
  }


}
