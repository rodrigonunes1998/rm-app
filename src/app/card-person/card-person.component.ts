import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICharacter } from '../dashboard/dashboard.component';



@Component({
  selector: 'app-card-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-person.component.html',
  styleUrl: './card-person.component.css'
})
export class CardPersonComponent {

  //Informacoes de entrada para o card
  @Input() infoCharacter!: ICharacter;

  @Output() selectedCharacter: EventEmitter<any> = new EventEmitter<any>();



  public handleOpenCard(object: ICharacter):void {
    this.selectedCharacter.emit(object);
  }


}
