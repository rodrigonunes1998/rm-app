import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CabecalhoComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
