import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
}

@Component({
  selector: 'app-episode-card',
  imports: [FormsModule, CommonModule],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.css'
})
export class EpisodeCardComponent {

  //Informacoes de entrada para o card
    @Input() infoEpisode!: IEpisode;
  
    @Output() selectedEpisode: EventEmitter<any> = new EventEmitter<any>();
  
  
  
    /**
     * Emite um evento para o componente pai abrir o modal com o card de episodio com as informacoes.
     * @param object 
     */
    public handleOpenCard(object: any):void {
      this.selectedEpisode.emit(object);
    }
}
