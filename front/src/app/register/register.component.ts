import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import 'rxjs/Rx';
import { User } from '../models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ ],
})
export class RegisterComponent implements OnInit {

  pic: any;

  constructor(private _authService:AuthService) { }

  ngOnInit() {
  }

  onChange(event){
    let image = event.srcElement.files[0];
    if(image){
      this.pic = image;
    }
    else{
      this.pic = null;
    }
  }

  register(form: any, event: Event) {
    event.preventDefault();
    var formData: any = new FormData();
    if(this.pic){
      formData.append('userImage',this.pic);
    }
    let name = form.value.name;
    let email = form.value.email;
    let password = form.value.pass;
    let phone = form.value.phone;
    formData.append('name',name);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('phone',phone);
    this._authService.register(formData).subscribe(data => {
      // console.log(data);
      if(data.success){
        this._authService.localLogin(name, data.id, data.token);
        location.assign('http://localhost:4200/home');
      }
      else{
        console.log(data.errors);
      }
    });
    return false;
  }


}
