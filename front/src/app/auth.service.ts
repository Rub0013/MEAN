import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  public static API_BASE = 'http://localhost:8888/api';
  public static LOGIN_USER_API = `${AuthService.API_BASE}/login`;
  public static NEW_USER_API = `${AuthService.API_BASE}/register`;
  public static GET_USER_API = `${AuthService.API_BASE}/get_user?id=`;
  public static UPDATE_USER_API = `${AuthService.API_BASE}/update_user`;
  public static DELETE_IMAGE_API = `${AuthService.API_BASE}/remove_pic`;
  public static CHANGE_IMAGE_API = `${AuthService.API_BASE}/change_pic`;
  public static AUTH_CHECK_API = `${AuthService.API_BASE}/verify`;

  public static LOCAL_LOG_USER = 'logged-user';


  constructor(private _http:Http, private router: Router) {}

  localLogin(name,id,token){
    let loggedUser = {
      name: name,
      id: id,
      token: token
    }
    localStorage.setItem(AuthService.LOCAL_LOG_USER,JSON.stringify(loggedUser));
  }

  login(login: string,pass: any){
    let body = JSON.stringify({login:login, password:pass});
    let headers = new Headers({'Content-Type':'application/json'});
    return this._http.post(AuthService.LOGIN_USER_API, body, {headers:headers})
        .map((res: Response) => {
          return res.json();
        });
  }

  logout(){
    localStorage.removeItem(AuthService.LOCAL_LOG_USER);
  }

  getLoggedUser(){
    return JSON.parse(localStorage.getItem(AuthService.LOCAL_LOG_USER))
  }

  register(formData: any){
    return this._http.post(AuthService.NEW_USER_API, formData)
        .map((res: Response) => {
          return res.json();
        });
  }

  isAuthenticated(){
    let loggedUser = this.getLoggedUser()
    if(loggedUser){
      let tokenData = {
        verifyToken: loggedUser.token
      };
      let body = JSON.stringify(tokenData);
      let headers = new Headers({'Content-Type':'application/json'});
      return this._http.post(AuthService.AUTH_CHECK_API, body, {headers:headers})
          .map((res: Response) => {
        let response = res.json();
            if(response.success){
              return true;
            } else {
              this.logout();
              this.router.navigate(["login"]);
              return false;
            }
          });
    }
  }

  getUser(id:string) :Observable<any>{
    return this._http.get(AuthService.GET_USER_API + id)
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
    return this._http.post(AuthService.UPDATE_USER_API, body, {headers:headers})
        .map((res: Response) => {
          return res.json();
        });
  }

  deletePic(id: number, name: string){
    let body = JSON.stringify({id:id, name:name});
    let headers = new Headers({'Content-Type':'application/json'});
    return this._http.post(AuthService.DELETE_IMAGE_API, body, {headers:headers})
        .map((res: Response) => {
          return res.json();
        });
  }

  changePic(formData: any){
    return this._http.post(AuthService.CHANGE_IMAGE_API, formData)
        .map((res: Response) => {
          return res.json();
        });
  }
}