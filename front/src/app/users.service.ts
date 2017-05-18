import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { User } from './models/user';

@Injectable()
export class UsersService {

  public static API_BASE = 'http://localhost:8888/api';
  public static NEW_USER_API = `${UsersService.API_BASE}/add_user`;
  public static DELETE_USER_API = `${UsersService.API_BASE}/delete_user?id=`;
  public static UPDATE_USER_API = `${UsersService.API_BASE}/update_user`;

  constructor(private _http:Http) {}

  addUser(user:User){
    let body = JSON.stringify({user:user});
    let headers = new Headers({'Content-Type':'application/json'});
    return this._http.post(UsersService.NEW_USER_API, body, {headers:headers})
        .map((res: Response) => {
            return res.json();
        });
  }

  deleteUser(id:number){
    return this._http.delete(UsersService.DELETE_USER_API + id)
        .map((res: Response) => {
            return res.json();
        });
  }

  updateUser(id:any, name:string = null, phone:number = null){
      let body = JSON.stringify({
          id:id,
          name:name,
          phone:phone
      });
      let headers = new Headers({'Content-Type':'application/json'});
      return this._http.post(UsersService.UPDATE_USER_API, body, {headers:headers})
          .map((res: Response) => {
              return res.json();
          });
  }
}
