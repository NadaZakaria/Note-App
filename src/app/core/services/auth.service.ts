import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken:BehaviorSubject<any> = new BehaviorSubject(null)
  constructor (private _HttpClient:HttpClient) {this.setUserToken() }

  setUserToken():void{
    let token = localStorage.getItem('token')
    if(token!= null){
      this.userToken.next(token)
    }
  }

  signupAPI(userInfo:UserData):Observable<any>{
    return this._HttpClient.post(environment.baseUrl + 'signUp',userInfo )
  }

  signinAPI(userInfo:UserData):Observable<any>{
    return this._HttpClient.post(environment.baseUrl + 'signIn', userInfo)
  }
}
