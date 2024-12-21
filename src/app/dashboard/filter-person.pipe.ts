import { Pipe, PipeTransform } from '@angular/core';
import {ICharacter} from './dashboard.component';




@Pipe({
  name: 'filterPerson'
})
export class FilterPersonPipe implements PipeTransform {

  transform(characters: ICharacter[], termSearch: string): ICharacter[] {
    if(!characters || !termSearch){
      return characters;
    }else {
      return characters.filter(character =>
        character.name.toLowerCase().includes(termSearch.toLowerCase())
      );
    }
  }

}
