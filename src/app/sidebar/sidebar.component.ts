import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() activeSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  public currentUrl: string = "";
  public stateSidebar: boolean = false;

  constructor(private router: Router){
    
  }

  ngOnInit(){
    this.currentUrl = this.router.url;
  } 
  
  public handleEnterSidebar(): void {
    this.stateSidebar = true;
    this.activeSidebar.emit(true);
  }

  public handleExitSidebar(): void {
    this.stateSidebar = false;
    this.activeSidebar.emit(false);
  }
}
