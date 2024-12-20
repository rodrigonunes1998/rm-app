import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CharactersServiceService {
  private baseUrlApi = environment.apiBaseUrl;
  private baseEndpoint = "/character"
  constructor(private http: HttpClient) { 
    console.log(`${this.baseUrlApi}${this.baseEndpoint}`);
  }


  public getAllCharacters(): Observable<any>{
    return this.http.get(`https://rickandmortyapi.com/api/character`);
  }

}
