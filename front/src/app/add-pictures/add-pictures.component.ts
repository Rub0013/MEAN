import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-add-pictures',
  templateUrl: './add-pictures.component.html',
  styleUrls: ['./add-pictures.component.css'],
  providers: [ FileUploadService ]
})
export class AddPicturesComponent implements OnInit {

  submitActive: boolean = true;
  pic: any = null;

  constructor(private _uploadService:FileUploadService) { }

  ngOnInit() {
  }

  onChange(event){
    let image = event.srcElement.files[0];
    if(image){
      this.submitActive = false;
      this.pic = image;
    }
    else{
      this.submitActive = true;
      this.pic = null;
    }
  }

  addImg() {
    console.log(this.pic);
    var formData: any = new FormData();
    formData.append('photo',this.pic);
    this._uploadService.addImage(formData).subscribe(data => {
      console.log(data);
    });
  }
}
