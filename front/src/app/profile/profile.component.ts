import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { User } from '../models/user';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ MdDialog, AuthService ],
})
export class ProfileComponent implements OnInit {

  static user: User;
  deleteImgActive: boolean = true;

  constructor(public dialog: MdDialog, private _authService:AuthService) { }

  ngOnInit() {
    let loged = this._authService.getLoggedUser();
    this._authService.getUser(loged.id).subscribe(data => {
      if(data.success){
        ProfileComponent.user = data.user;
        if(ProfileComponent.user.image){
          this.deleteImgActive = false;
        }
      }
    });
  }

  returnUser(){
    return ProfileComponent.user;
  }

  deleteImg() {
    let id = ProfileComponent.user._id;
    let name = ProfileComponent.user.image;
    this._authService.deletePic(id,name).subscribe(data => {
      if (data.success) {
        delete ProfileComponent.user.image;
        this.deleteImgActive = true;
      }
    });
  }

  updateImg(){
    this.dialog.open(UpdateImageModal);
  }

  updateUser(): void {
    this.dialog.open(UpdateInfoModal);
  }

}

@Component({
  selector: 'update-infoModal',
  template: `<h1 md-dialog-title>Update</h1>
               <div md-dialog-content>
                    <md-input-container>
                        <input mdInput placeholder="Name" [(ngModel)]="userName">
                    </md-input-container>
                    <md-input-container color="accent">
                        <input mdInput placeholder="Phone" [(ngModel)]="userPhone">
                    </md-input-container>
               </div>
               <div md-dialog-actions>
                    <button md-button (click)="dialogRef.close()">Cancel</button>
                    <button md-button (click)="updateUserModal()">Update</button>
               </div>`,
})
export class UpdateInfoModal implements OnInit {

  userName: string;
  userPhone: number;
  userId: number;

  constructor(public dialogRef: MdDialogRef<UpdateInfoModal>, private _authService:AuthService) {
  }

  ngOnInit() {
        this.userId = ProfileComponent.user._id;
        this.userName = ProfileComponent.user.name;
        this.userPhone = ProfileComponent.user.phone;
  }

  updateUserModal() {
    this._authService.updateUser(this.userId, this.userName, this.userPhone).subscribe(data => {
      if(data.success){
        ProfileComponent.user.name = data.data.name;
        ProfileComponent.user.phone = data.data.phone;
      }
      this.dialogRef.close();
    });
  }
}

@Component({
  selector: 'update-imageModal',
  template: `<h1 md-dialog-title>Update</h1>
               <div md-dialog-content>
                   <label class="btn btn-default btn-file">
                    Browse <input (change)="onChange($event)" type="file" id="image_file" style="display: none" accept=".jpg,.png">
                   </label>
               </div>
               <div md-dialog-actions>
                    <button md-button (click)="dialogRef.close()">Cancel</button>
                    <button (click)="updateImgModal($event)" [disabled]="submitActive" md-button color="primary">Update</button>
               </div>`,
})

export class UpdateImageModal implements OnInit {

  userId: number;
  oldImage: string;
  newImage: any = null;
  submitActive: boolean = true;


  constructor(public dialogRef: MdDialogRef<UpdateImageModal>, private _authService:AuthService) {
  }

  ngOnInit() {
    this.userId = ProfileComponent.user._id;
    this.oldImage = ProfileComponent.user.image;
  }

  onChange(event){
    let image = event.srcElement.files[0];
    if(image){
      this.submitActive = false;
      this.newImage = image;
    }
    else{
      this.submitActive = true;
      this.newImage = null;
    }
  }

  updateImgModal(event: Event){
    event.preventDefault();
    var formData: any = new FormData();
    if(this.newImage){
      formData.append('newImage',this.newImage);
    }
    formData.append('userId',this.userId);
    formData.append('oldImage',this.oldImage);
    this._authService.changePic(formData).subscribe(data => {
      console.log(data);
      if (data.success) {

      }
    });
  }
}
