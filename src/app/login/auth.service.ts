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

  //Captura o nome do usuario
  public static getUser() {
    return localStorage.getItem('username');
  }

  //Captura o token
  public static getToken(){
    return localStorage.getItem('token');
  }

  //Limpa o localStorage ao deslogar
  private deleteAuthentication(){
    localStorage.clear();
  }

  /**
   * Limpa o localStorage e redireciona para a pagina de login
   */
  public logout(){
    this.deleteAuthentication();
    this.router.navigate(['login']);
  }
}
