import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { NgForm } from '@angular/forms';
import 'rxjs/Rx';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ UsersService ]
})
export class HomeComponent implements OnInit {

  users:any = [];

  constructor(private _usersService:UsersService) {
  }

  ngOnInit() {
    this._usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onSubmit(form:NgForm) {
    let name = form.value.user_name;
    let email = form.value.user_email;
    let phone = form.value.user_number;
    let user = new User(name,email,phone);
    this._usersService.addUser(user).subscribe(data => {
      if(data.id){
        user._id = data.id;
        this.users.push(user);
        form.reset();
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
