import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstant } from '../../Constant/APIConstants';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from '../../models/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpClient) { }

  login(data: Login): Observable<any> {debugger
    return this.httpService.post(APIConstant.login.login, data);
  }

  logout(data: Login): Observable<any> {
    return this.httpService.post(APIConstant.login.logout, data);
  }

}
