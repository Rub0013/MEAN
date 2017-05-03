import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import 'rxjs/Rx';
import { User } from '../models/user';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ UsersService ],
})
export class HomeComponent implements OnInit {

  users:Array<User>;

  validEmail = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  validPhone = /^\d+$/;
  constructor(private _usersService:UsersService) {
  }

  ngOnInit() {
    this._usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onSubmit(form: any) {
    let name = form.value.name;
    let email = form.value.email;
    let phone = form.value.phone;
    let user = new User(name,email,phone);
    this._usersService.addUser(user).subscribe(data => {
      if(data.success){
        user._id = data.id;
        this.users.push(user);
        form.reset();
      }
      else{
        console.log(data.errors);
      }
    });
  }

  deleteUser(id){
    this._usersService.deleteUser(id).subscribe(data => {
      if(data.success){
        let arr =  this.users;
        this.users = arr.filter(function(el) {
          return el._id !== id;
        });
      }
    });
  }

}
