import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import 'rxjs/Rx';
import { User } from '../models/user';
import { MdDialog, MdDialogRef } from '@angular/material';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ UsersService, MdDialog ],
})
export class HomeComponent implements OnInit {

  static users:Array<User>;

  validEmail = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  validPhone = /^\d+$/;
  constructor(private _usersService:UsersService, public dialog: MdDialog) {
  }

  ngOnInit() {
    this._usersService.getUsers().subscribe(data => {
      HomeComponent.users = data;
    });
  }

  allUser() {
    return HomeComponent.users;
  }

  onSubmit(form: any) {
    let name = form.value.name;
    let email = form.value.email;
    let phone = form.value.phone;
    let user = new User(name,email,phone);
    this._usersService.addUser(user).subscribe(data => {
      if(data.success){
        user._id = data.id;
        HomeComponent.users.push(user);
        form.reset();
      }
      else{
        console.log(data.errors);
      }
    });
  }

  deleteUser(id) {
    this._usersService.deleteUser(id).subscribe(data => {
      if(data.success){
        let arr =  HomeComponent.users;
        HomeComponent.users = arr.filter(function(el) {
          return el._id !== id;
        });
      }
    });
  }

  updateUser(id): void {
    this.dialog.open(UpdateModal, {data: {
      userId: id
    }});
  }

}

@Component({
  selector: 'update-modal',
  template: `<h1 md-dialog-title>Update</h1>
               <div md-dialog-content>
                    <md-input-container>
                        <input mdInput placeholder="Name" [(ngModel)]="userName">
                    </md-input-container>
                    <md-input-container>
                        <input mdInput placeholder="Phone" [(ngModel)]="userPhone">
                    </md-input-container>
               </div>
               <div md-dialog-actions>
                    <button md-button (click)="dialogRef.close()">Cancel</button>
                    <button md-button (click)="updateUserModal()">Update</button>
               </div>`,
})
export class UpdateModal implements OnInit {

  userName: string;
  userPhone: number;
  static userId: number;

  constructor(public dialogRef: MdDialogRef<UpdateModal>, private _usersService:UsersService) {
  }

  ngOnInit() {
    UpdateModal.userId = this.dialogRef._containerInstance.dialogConfig.data.userId;
    for(let i = 0; i< HomeComponent.users.length; i++){
      if(HomeComponent.users[i]._id == UpdateModal.userId){
        this.userName = HomeComponent.users[i].name;
        this.userPhone = HomeComponent.users[i].phone;
      }
    }
  }

  updateUserModal() {
    this._usersService.updateUser(UpdateModal.userId, this.userName, this.userPhone).subscribe(data => {
      if(data.success){
        HomeComponent.users.forEach(function(user, index, usersArray) {
          if(user._id == UpdateModal.userId) {
            user.name = data.data.name;
            user.phone = data.data.phone;
          }
        });
        this.dialogRef.close();
      }
    });
  }
}
