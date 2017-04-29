import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploadService {

  public static API_BASE = 'http://localhost:8888/api';
  public static ADD_IMAGE_API = `${FileUploadService.API_BASE}/add_image`;

  constructor(private _http: Http) {}

  addImage(formData: any){
    return this._http.post(FileUploadService.ADD_IMAGE_API, formData)
        .map((res: Response) => {
          return res.json();
        });
  }
}

