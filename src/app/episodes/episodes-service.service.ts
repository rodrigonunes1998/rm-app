import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EpisodesService {
  private urlApi: string = "https://rickandmortyapi.com/api/episode/";

  constructor(private http: HttpClient) { }


  public getAllEpisodes(page: number): Observable<any>{
    return this.http.get(`${this.urlApi}?page${page}`);
  }

  public getCharactersInEpisode(link: string): Observable<any>{
    return this.http.get(`${link}`);
  }
}
