import { Component, HostListener, OnInit, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { CharactersServiceService } from './characters-service.service';
import { RouterOutlet, Router } from '@angular/router';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardPersonComponent } from '../card-person/card-person.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { FilterPersonPipe } from './filter-person.pipe';


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
  imports: [RouterOutlet, CabecalhoComponent, SidebarComponent, CardPersonComponent, CommonModule, HttpClientModule, MatIconModule, FormsModule,FilterPersonPipe],
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
  public textSearch: string = "";

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
        let somativa = this.scrollPosition + this.containerHeight;
        if (somativa >= this.scrollHeightPosition && !this.isLoading) {
          this.handleNextPage();
        }
      });
    }
  }

  public trackByIndex(index: number): number {
    return index;
  }


  public getAllCharacters(): void {
    this.characterService.getAllCharacters(this.currentPage)
      .pipe(
        takeUntil(this.unsubscription$),
        
      )
      .subscribe((response: any) => {
        this.listCurrentCharacters = response.results;
        this.totalPages = response.info.pages;
        this.calculateHeight();
      });
  }

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
      this.characterService.getAllCharacters(this.currentPage).subscribe((response: any) => {
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
    //this.characterService.getCharatersWithFilter()
  }

}
