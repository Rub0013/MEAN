import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploadService {

  public static API_BASE = 'http://localhost:8888/api';
  public static ADD_IMAGE_API = `${FileUploadService.API_BASE}/add_image`;
  public static GET_IMAGES_API = `${FileUploadService.API_BASE}/get_images`;
  public static DELETE_IMAGE_API = `${FileUploadService.API_BASE}/remove_pic`;

  constructor(private _http: Http) {}

  addImage(formData: any){
    return this._http.post(FileUploadService.ADD_IMAGE_API, formData)
        .map((res: Response) => {
           return res.json();
        });
  }

  getUsers() :Observable<any>{
    return this._http.get(FileUploadService.GET_IMAGES_API)
        .map((res: Response) => {
           return res.json();
        });
  }

  deletePic(id: string, name: string){
        let body = JSON.stringify({id:id, name:name});
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.post(FileUploadService.DELETE_IMAGE_API, body, {headers:headers})
            .map((res: Response) => {
                return res.json();
            });
  }
}

