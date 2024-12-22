import { Component, HostListener, OnInit, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { CharactersServiceService } from './characters-service.service';
import { RouterOutlet, Router } from '@angular/router';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardPersonComponent } from '../card-person/card-person.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { FilterPersonPipe, FilterPersonStatusPipe,FilterPersonGenderPipe, FilterPersonSpeciePipe } from './filter-person.pipe';


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
  imports: [RouterOutlet, CabecalhoComponent, SidebarComponent, CardPersonComponent, CommonModule, HttpClientModule, MatIconModule, FormsModule,FilterPersonPipe, FilterPersonStatusPipe, FilterPersonGenderPipe,FilterPersonSpeciePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CharactersServiceService]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('containerContentCards') contentCards: any;
  public containerHeight!: number;
  public scrollPosition: number = 0;
  public scrollHeightPosition: number = 0;

  public listCharacters!: Array<ICharacter>;
  public listCurrentCharacters!: Array<ICharacter>;
  public listFilteredCharacters!: Array<ICharacter>;
  public currentPage: number = 1;
  public totalPages!: number;
  public isLoading: boolean = false;

  //Variables research
  public textSearch: string = "";
  public listFilterStatus: Array<any> = [];
  public listFilterGender: Array<any> = [];
  public listFilterSpecies: Array<any> = [];
  public statusSelected: string = "";
  public genderSelect: string = "";
  public speciesSelected: string = "";
  
  public cardSelected!: any;

  private unsubscription$ = new Subject<void>;

  constructor(private characterService: CharactersServiceService) { }


  ngOnInit() {
    this.getAllCharacters();
  }

  ngOnDestroy(): void {
    this.unsubscription$.next();
    this.unsubscription$.complete();
  }

  ngAfterViewInit(): void {
    this.calculateHeight();

    if (this.contentCards) {
      this.contentCards.nativeElement.addEventListener('scroll', (event: Event) => {
        this.scrollPosition = this.contentCards.nativeElement.scrollTop;
        console.log(this.scrollPosition);
        let somativa = this.scrollPosition + this.containerHeight;
        if (somativa >= this.scrollHeightPosition && !this.isLoading) {
          this.handleNextPage();
        }
      });
    }
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
          this.listFilterStatus = [... new Set(this.listFilterStatus),... new Set(characters.results.map((results: any) => results.status))];
          this.listFilterGender = [... new Set(this.listFilterGender), ... new Set(characters.results.map((results: any) => results.gender))];
          this.listFilterSpecies = [...new Set(this.listFilterSpecies),... new Set(characters.results.map((results: any) => results.species))];
          return characters;
        })
      )
      .subscribe((response: any) => {
        this.listCurrentCharacters = response.results;
        this.totalPages = response.info.pages;
        this.calculateHeight();
      });
  }

  /**
   * Funcao para calcular altura do container para ativar a paginacao por scrolling
   */
  public calculateHeight(): void {
    if (this.contentCards) {
      let container: any = this.contentCards.nativeElement;
      this.containerHeight = container.offsetHeight;
      this.scrollHeightPosition = container.scrollHeight;
    }
  }

  public handleNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.isLoading = true;
      this.characterService.getAllCharacters(this.currentPage)
      .pipe(
        map((character: any) => {
          /**
           * Processo geracao de filtros qual atualizar a pagina por scrolling
           */
          this.listFilterStatus = [... new Set(this.listFilterStatus),... new Set(character.results.map((result: any) => result.status))];
          this.listFilterGender = [... new Set(this.listFilterGender),... new Set(character.results.map((result: any) => result.gender))];
          this.listFilterSpecies = [... new Set(this.listFilterSpecies),... new Set(character.results.map((results: any) => results.type))];
          return character;
        })
      )
      .subscribe((response: any) => {
        this.listCurrentCharacters = [... this.listCurrentCharacters, ...response.results];
        setTimeout(() => {
          this.calculateHeight(); // Recalcula a altura após carregar os novos dados
          this.isLoading = false;
        }, 0);
      });
    }
  }


  public openCard(event: Event): void {
    this.cardSelected = event;
  }

  public handleFilterCharacter(){
    console.log(this.genderSelect);
    console.log(this.statusSelected);
  }

}
