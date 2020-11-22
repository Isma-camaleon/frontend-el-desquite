import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { RespuestaLogin } from 'src/app/commons/interfaces/respuesta-login-interface';
import { Router } from '@angular/router';
import * as shajs from 'sha.js';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: HttpClient, public router: Router, public authService: AuthenticationService) { }
  public login(username: string, password: string) {
    const url = `${environment.auth_url}oauth/token`;
    const passEncode = shajs('sha512').update(password).digest('hex');
    let bodyH;

    bodyH = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
        .set('Authorization', 'Basic ZGVzcXVpdGVDbGllbnQ6N2IyYmIzZjMtNzk4ZC00N2IyLTkwY2UtNTkyZDE5Y2NlZGMw'),
      body: bodyH
    };
    return this.http.post<RespuestaLogin>(url, bodyH.toString(), options);
  }
}
