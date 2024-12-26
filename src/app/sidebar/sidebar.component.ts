import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [AuthService]
})
export class SidebarComponent {
  //Evento de saida para expandir/encurtar a sidebar
  @Output() activeSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Variavel para capturar a url atual
  public currentUrl: string = "";

  //Variavel para expandir ou encurtar a stateSidebar
  public stateSidebar: boolean = false;

  constructor(private router: Router, private authService: AuthService){
    
  }

  ngOnInit(){
    this.currentUrl = this.router.url;
  } 
  
  /**
   * Funcao que emite o evento quando o mouse entra na sidebar
   */
  public handleEnterSidebar(): void {
    this.stateSidebar = true;
    this.activeSidebar.emit(true);
  }

  /**
   * Funcao que emite o evento quando o mouse sai da sidebar
   */
  public handleExitSidebar(): void {
    this.stateSidebar = false;
    this.activeSidebar.emit(false);
  }

  /**
   * Funcao para executar logout no sistema
   */
  public handleLogout(){
    this.authService.logout();
  }
}
