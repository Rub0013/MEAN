import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [ FileUploadService ],
  animations: [
    trigger('state', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class GalleryComponent implements OnInit {

  pics: Array<any>;
  state:string = 'inactive';

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

  toggleState() {
    // 1-line if statement that toggles the value:
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
  }

}
