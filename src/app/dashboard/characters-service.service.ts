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


  public getAllCharacters(page: number): Observable<any>{
    return this.http.get(`${this.baseUrlApi}${this.baseEndpoint}/?page=${page}`);
  }

  public getCharactersWithFilter(filter: any): Observable<any>{
    let paramsFilter = new HttpParams({fromObject: filter}).toString()
    return this.http.get(`${this.baseUrlApi}${this.baseEndpoint}/?${paramsFilter}`);
  }

}
