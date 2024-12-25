import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 
import { AuthService } from '../login/auth.service';
@Component({
  selector: 'app-cabecalho',
  imports: [MatIconModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  public user: string | null = AuthService.getUser();
}
