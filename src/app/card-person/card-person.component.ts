import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin;
  location: ILocation;
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

interface IOrigin {
  name: string;
  url: string;
}

interface ILocation {
  name: string;
  url: string;
}


@Component({
  selector: 'app-card-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-person.component.html',
  styleUrl: './card-person.component.css'
})
export class CardPersonComponent {
  @Input() infoCharacter!: ICharacter;




}
