import { Component, ElementRef, ViewChild } from '@angular/core';
import { CardPersonComponent } from "../card-person/card-person.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { CommonModule } from '@angular/common';
import { EpisodeCardComponent, IEpisode } from "../episode-card/episode-card.component";
import { EpisodesService } from './episodes-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ICharacter } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-episodes',
  imports: [ RouterOutlet, SidebarComponent, CabecalhoComponent, CommonModule, EpisodeCardComponent, HttpClientModule, MatIconModule],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css',
  providers: [EpisodesService]
})
export class EpisodesComponent {

  //Variaveis para scroll pagination
  @ViewChild('sentinela') sentinela!: ElementRef;
  private observer!: IntersectionObserver;
  public isLoading: boolean = false;

  //Variavel de manipulacao de margem da sidebar
  public sideBarOpen: boolean = false;

  //variaveis de listagem e paginacao
  public listCurrentEpisodes!: Array<IEpisode>;
  public currentPage: number = 1;
  public totalPages!: number;

  //Variaveis do Card  - Episodio
  public cardSelected!: any;
  public showCharacters: boolean = false;
  public listCharacters: Array<ICharacter> = [];

  //Variaveis card Personagem
  public cardSelectedCharacter: any;


  /**
   * Funcao para expandir a sidebar quando o mouse posicionar em cima
   * @param event
   */
  public openSideBar(event: boolean): void{
    this.sideBarOpen = event;
  }

  constructor(private episodeService: EpisodesService){
    
  }

  ngOnInit(){
    this.getAllEpisodes();
  }

  ngAfterViewInit(){
    this.observer = new IntersectionObserver((entries: any) => {
      const sentinela = entries[0];
      if (sentinela.isIntersecting && !this.isLoading) {
       
        this.getNextPage();
      }
    }, {
      root: null,
      threshold: 1.0
    })

    this.observer.observe(this.sentinela.nativeElement);
  }

  /**
   * Funcao para listar todos os episodios
   */
  public getAllEpisodes(): void{
    this.episodeService.getAllEpisodes(this.currentPage).subscribe((response: any)=>{
      this.listCurrentEpisodes = response.results
      this.totalPages = response.info.pages
    });
  }

  /**
   * Funcao verifica se a pagina atual e menor que o total de paginas.
   * Se tiver abaixo, realiza a requisicao da proxima pagina.
   */
  public getNextPage(): void {
    if(this.currentPage < this.totalPages){
      this.currentPage++;
    this.episodeService.getAllEpisodes(this.currentPage).subscribe((response: any)=>{
      this.listCurrentEpisodes = [...this.listCurrentEpisodes,...response.results];
    })
    }
  }

  public handleExpandCharacters(): void{
    this.showCharacters = !this.showCharacters;
  }

  /**
   * Funcao para abrir um card de episodio. Ao abrir, e requisitado informacoes sobre os personagens do episodio.
   * @param event 
   */
  public openCard(event: Event){
    this.cardSelected = event;
    this.cardSelected.characters.forEach((element: string)=> {
      this.getCharactersInEpisode(element);
    });
  }

  /**
   * Funcao para fechar o card de episodio, fechando tambem a section expandida dos personagens e limpando o array de personagens
   */
  public closeCard(){
    this.cardSelected = "";
    this.showCharacters = false;
    this.listCharacters = [];
  }

  /**
   * Funcao para capturar informacoes do personagem
   * @param link 
   */
  public getCharactersInEpisode(link: string){
    this.episodeService.getCharactersInEpisode(link).subscribe((response: any)=>{
      this.listCharacters.push(response)
    })
  }

  //Funcao para abri o card de visualizacao de informacao do personagem
  public openCardCharacter(character: ICharacter){
   this.cardSelectedCharacter = character;
   console.log(this.cardSelectedCharacter);
  }

  //Funcao para fechar o card de visualizacao do personagem
  public closeCardCharacter(){
    this.cardSelectedCharacter = "";
  }
}
