import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CharactersServiceService {
  private baseUrlApi = environment.apiBaseUrl;
  private baseEndpoint = "/character"
  constructor(private http: HttpClient) { 
    console.log(`${this.baseUrlApi}${this.baseEndpoint}`);
  }


  public getAllCharacters(page: number): Observable<any>{
    return this.http.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
  }

  public getCharactersWithFilter(filter: any): Observable<any>{
    console.log(filter);
    let paramsFilter = new HttpParams({fromObject: filter}).toString()
    return this.http.get(`https://rickandmortyapi.com/api/character/?${paramsFilter}`);
  }

}
