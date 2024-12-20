import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CabecalhoComponent, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  public teste(): void {
    console.log("Entrou na sidebar");
  }
}
