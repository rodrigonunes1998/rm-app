import { Component, HostListener, OnInit, ViewChild, AfterViewInit, EventEmitter, ElementRef } from '@angular/core';
import { CharactersServiceService } from './characters-service.service';
import { RouterOutlet, Router } from '@angular/router';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardPersonComponent } from '../card-person/card-person.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject, map, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { FilterPersonPipe, FilterPersonStatusPipe, FilterPersonGenderPipe, FilterPersonSpeciePipe } from './filter-person.pipe';
import { EpisodesService } from '../episodes/episodes-service.service';


export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin;
  location: ILocation;
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

interface IOrigin {
  name: string;
  url: string;
}

interface ILocation {
  name: string;
  url: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, CabecalhoComponent, SidebarComponent, CardPersonComponent, CommonModule, HttpClientModule, MatIconModule, FormsModule, FilterPersonPipe, FilterPersonStatusPipe, FilterPersonGenderPipe, FilterPersonSpeciePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CharactersServiceService, EpisodesService],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  //Variaveis para fazer a paginacao por scroll
  @ViewChild('sentinela') sentinela!: ElementRef;
  private observer!: IntersectionObserver;

  //Variavel de manipulacao da sidebar
  public sideBarOpen: boolean = false;

  //Variaveis de listagem dos personagens
  public listCharacters!: Array<ICharacter>;
  public listCurrentCharacters!: Array<ICharacter>;
  public listFilteredCharacters!: Array<ICharacter>;
  public currentPage: number = 1;
  public totalPages!: number;
  public isLoading: boolean = false;

  //Variaveis de pesquisa
  public textSearch: string = "";
  public listFilterStatus: Array<any> = [];
  public listFilterGender: Array<any> = [];
  public listFilterSpecies: Array<any> = [];
  public statusSelected: string = "";
  public genderSelect: string = "";
  public speciesSelected: string = "";

  //Variaveis de exibicao do card
  public cardSelected!: any;
  public cardSelectedEpisode!: any;
  public showEpisodes: boolean = false;
  private unsubscription$ = new Subject<void>;

  constructor(private characterService: CharactersServiceService, private episodeService: EpisodesService) { }


  ngOnInit() {
    this.getAllCharacters();
  }

  /**
   * Funcao ao ser destruido o componente, resolve e libera todas as subscricoes.
   */
  ngOnDestroy(): void {
    this.unsubscription$.next();
    this.unsubscription$.complete();
  }


  /**
   * Apos a renderizacao e realizada a verificacao para intersecao da sentinela para paginacao por scroll
   */
  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries: any) => {
      const sentinela = entries[0];
      if (sentinela.isIntersecting && !this.isLoading) {
        this.handleNextPage();
      }
    }, {
      root: null,
      threshold: 1.0
    })

    this.observer.observe(this.sentinela.nativeElement);

  }

  /**
   * Funcao trackby para nao precisar reenderizar o dom da listagem
   */
  public trackByIndex(index: number): number {
    return index;
  }

  /**
   * Funcao para realizar o preenchimento do array de personagens
   */
  public getAllCharacters(): void {
    this.characterService.getAllCharacters(this.currentPage)
      .pipe(
        takeUntil(this.unsubscription$),
        map((characters: any) => {
          /**
           * Processo geracao de filtros
           */
          this.listFilterStatus = [...new Set([...this.listFilterStatus, ...characters.results.map((results: any) => results.status)])];
          this.listFilterGender = [...new Set([...this.listFilterGender, ...characters.results.map((results: any) => results.gender)])];
          this.listFilterSpecies = [...new Set([...this.listFilterSpecies, ...characters.results.map((results: any) => results.species)])];
          return characters;
        })
      )
      .subscribe((response: any) => {
        this.listCurrentCharacters = response.results;
        this.totalPages = response.info.pages;
      });
  }

  /**
   * Funcao para requisitar a proxima pagina via API.
   */
  public handleNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.isLoading = true;
      this.characterService.getAllCharacters(this.currentPage)
        .pipe(
          map((characters: any) => {
            /**
             * Processo geracao de filtros qual atualizar a pagina por scrolling
             */
            this.listFilterStatus = [...new Set([...this.listFilterStatus, ...characters.results.map((results: any) => results.status)])];
            this.listFilterGender = [...new Set([...this.listFilterGender, ...characters.results.map((results: any) => results.gender)])];
            this.listFilterSpecies = [...new Set([...this.listFilterSpecies, ...characters.results.map((results: any) => results.species)])];
            return characters;
          })
        )
        .subscribe((response: any) => {
          this.listCurrentCharacters = [... this.listCurrentCharacters, ...response.results];
          setTimeout(() => {
            this.isLoading = false;
          }, 0);
        });
    }
  }


  /**
   * Funcao para abrir o card do personagem ao ser clicado.
   * @param event 
   */
  public openCard(event: Event): void {
    this.cardSelected = event;
  }

  /**
   * Funcao para fechar o card do personagem
   */
  public closeCard(): void {
    this.cardSelected = "";
    this.showEpisodes = false;
  }

  /**
   * Funcao para abrir a listagem dos episodios
   */
  public toggleEpisodes() {
    this.showEpisodes = !this.showEpisodes;
  }

  /**
   * Funcao para requisitar via API a listagem dos personagens utilizando filtros.
   */
  public handleFilterCharacter() {
    let objectFilters = {
      name: this.textSearch.toLowerCase(),
      status: this.statusSelected.toLowerCase(),
      gender: this.genderSelect.toLowerCase(),
      species: this.speciesSelected.toLowerCase()
    }
    this.characterService.getCharactersWithFilter(objectFilters).subscribe((response: any) => {
      this.listCurrentCharacters = response.results;
    })
  }

  /**
   * Funcao para abrir e requisitar as informacoes do episodio e exibir o card.
   * @param link 
   */
  public handleSelectCardEpisode(link: string): void {
    this.episodeService.getCharactersInEpisode(link).subscribe((response: any) => {
      this.cardSelectedEpisode = response;
    });
  }

  /**
   * Funcao para fechar o card de informacoes do episodio.
   */
  public closeCardEpisode(){
    this.cardSelectedEpisode = undefined;
  }
  
  /**
   * Funcao para expandir/encolher a sidebar na rota atual
   * @param event 
   */
  public openSidebar(event: boolean): void {
    this.sideBarOpen = event;
  }

}
