import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EpisodesService {
  private urlApi: string = "https://rickandmortyapi.com/api/episode/";

  constructor(private http: HttpClient) { }


  /**
   * Funcao para requisitar todos os episodios via API
   * @param page 
   * @returns 
   */
  public getAllEpisodes(page: number): Observable<any>{
    return this.http.get(`${this.urlApi}?page${page}`);
  }

  /**
   * Funcao para requisitar as informacoes de um episodio especifico atraves do link
   * @param link 
   * @returns 
   */
  public getCharactersInEpisode(link: string): Observable<any>{
    return this.http.get(`${link}`);
  }
}
