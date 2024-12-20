import { Component } from '@angular/core';
import { CardPersonComponent } from "../card-person/card-person.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';

@Component({
  selector: 'app-episodes',
  imports: [CardPersonComponent, RouterOutlet, SidebarComponent, CabecalhoComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {

}
