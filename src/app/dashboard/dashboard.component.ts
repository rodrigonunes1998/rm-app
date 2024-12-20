import { Component } from '@angular/core';
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-dashboard',
  imports: [CabecalhoComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
