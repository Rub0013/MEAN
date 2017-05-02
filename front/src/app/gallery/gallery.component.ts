import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [ FileUploadService ]
})
export class GalleryComponent implements OnInit {

  pics: Array<any>;

  constructor(private _uploadService:FileUploadService) { }

  ngOnInit() {
    this._uploadService.getUsers().subscribe(data => {
      this.pics = data;
    });
  }

  deleteImg(id: string, name: string){
    this._uploadService.deletePic(id,name).subscribe(data => {
      if(data.success){
        this.pics = this.pics.filter(
            pic => pic._id != id);
      }
  });
}

}
