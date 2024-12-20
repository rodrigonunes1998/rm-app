import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { CardPersonComponent } from "../card-person/card-person.component";
import { CharactersServiceService } from './characters-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CabecalhoComponent, SidebarComponent, RouterOutlet, CardPersonComponent, HttpClientModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [CharactersServiceService]
})
export class DashboardComponent implements OnInit {
  public listCharacters!: Array<any>;


  constructor(private characterService: CharactersServiceService){
    
  }

  ngOnInit(){
   this.characterService.getAllCharacters().subscribe((response: any)=> {
    this.listCharacters = response.results;
    console.log(`Total de ${this.listCharacters.length}`)
   })

   
  }
}
