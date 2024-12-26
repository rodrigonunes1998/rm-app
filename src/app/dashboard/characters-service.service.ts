import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CharactersServiceService {
  private baseUrlApi = environment.apiBaseUrl;
  private baseEndpoint = "/character"
  constructor(private http: HttpClient) { 

  }


  /**
   * Funcao para listar todos os personagens via api.
   * @param page 
   * @returns 
   */
  public getAllCharacters(page: number): Observable<any>{
    return this.http.get(`${this.baseUrlApi}${this.baseEndpoint}/?page=${page}`);
  }

  /**
   * Funcao para listar todos os personagens via Api utilizando filtros.
   * @param filter 
   * @returns 
   */
  public getCharactersWithFilter(filter: any): Observable<any>{
    let paramsFilter = new HttpParams({fromObject: filter}).toString()
    return this.http.get(`${this.baseUrlApi}${this.baseEndpoint}/?${paramsFilter}`);
  }

}
