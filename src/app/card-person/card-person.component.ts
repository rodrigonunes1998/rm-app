import { Component } from '@angular/core';
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-card-person',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent],
  templateUrl: './card-person.component.html',
  styleUrl: './card-person.component.css'
})
export class CardPersonComponent {

}
