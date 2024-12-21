import { Component, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CharactersServiceService } from './characters-service.service';
import { RouterOutlet, Router } from '@angular/router';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardPersonComponent } from '../card-person/card-person.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ICharacter {
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
  imports:[RouterOutlet,CabecalhoComponent,SidebarComponent, CardPersonComponent, CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CharactersServiceService]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('containerContentCards') contentCards: any;
  public containerHeight: number = 0;
  public containerClientHeight: number = 0;
  public scrollPosition: number = 0;
  public scrollHeightPosition: number = 0;

  public listCharacters!: Array<ICharacter>;
  public currentPage: number = 1;

  constructor(private characterService: CharactersServiceService) { }

  ngOnInit() {
    console.log("requisitando api...");
    this.getAllCharacters();
  }

  ngAfterViewInit(): void {
    console.log("calculando apos inicializacao do container");
    this.calculateHeight();  // Chama a função após a renderização

    if (this.contentCards) {
      this.contentCards.nativeElement.addEventListener('scroll', (event: Event) => {
        this.scrollPosition = this.contentCards.nativeElement.scrollTop;  // Pega a posição de rolagem
        console.log("Posição do scroll dentro do contêiner (scrollTop):", this.scrollPosition);
      });
    }
  }

  public getAllCharacters(): void {
    this.characterService.getAllCharacters().subscribe((response: any) => {
      this.listCharacters = response.results;
      this.calculateHeight();  // Calcule novamente as dimensões após o carregamento dos dados
    });
  }

  public calculateHeight(): void {
    console.log("Calculating height");
    if (this.contentCards && this.contentCards.nativeElement) {
      // Captura a altura visível, a altura total e a posição do scroll do container de cards
      this.containerHeight = this.contentCards.nativeElement.offsetHeight;
      this.containerClientHeight = this.contentCards.nativeElement.clientHeight;
      this.scrollHeightPosition = this.contentCards.nativeElement.scrollHeight;

      // Log para ver os valores
      console.log("Altura do container:", this.containerHeight);
      console.log("Altura visível do container (clientHeight):", this.containerClientHeight);
      console.log("Altura total do conteúdo (scrollHeight):", this.scrollHeightPosition);
    }
  }

 

  // @HostListener('scroll', ['$event'])
  // onScroll(event: Event): void {
  //   console.log(event);
  //   const containerElement = this.contentCards.nativeElement;
  //   this.scrollPosition = containerElement.scrollTop;  // Pega a posição do scroll

  //   console.log("Posição do scroll (scrollTop):", this.scrollPosition);
  // }

}
