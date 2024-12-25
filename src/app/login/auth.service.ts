import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()

export class AuthService {

  constructor(private router: Router) { }

  public login(username: string, password: string): Observable<any> {
    return of({
      token: 'token-app-login',
      username: username,
    });
  }

  public static getUser() {
    return localStorage.getItem('username');
  }

  public static getToken(){
    return localStorage.getItem('token');
  }

  private deleteAuthentication(){
    localStorage.clear();
  }

  public logout(){
    this.deleteAuthentication();
    this.router.navigate(['login']);
  }
}
