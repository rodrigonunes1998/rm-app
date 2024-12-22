import { Pipe, PipeTransform } from '@angular/core';
import {ICharacter} from './dashboard.component';


/**
 * Pipe de filtragem pelo nome do personagem
 */

@Pipe({
  name: 'filterPersonName'
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

/**
 * Pipe de filtragem pelos status
 */

@Pipe({
  name: 'filterPersonStatus'
})
export class FilterPersonStatusPipe implements PipeTransform {
  transform(characters: ICharacter[], termSearch: string) {
    if(!characters || !termSearch){
      return characters;
    }else {
      return characters.filter(character =>
        character.status.toLowerCase().includes(termSearch.toLowerCase())
      );
    }
  }
}

/**
 * Pipe de filtragem pelo genero
 */

@Pipe({
  name: 'filterPersonGender'
})
export class FilterPersonGenderPipe implements PipeTransform {
  transform(characters: ICharacter[], termSearch: string) {
    if(!characters || !termSearch){
      return characters;
    }else {
      return characters.filter(character =>
        character.gender.toLowerCase().includes(termSearch.toLowerCase())
      );
    }
  }
}

/**
 * Pipe de filtragem das listas pela especie
 */

@Pipe({
  name: 'filterPersonSpecie'
})
export class FilterPersonSpeciePipe implements PipeTransform {
  transform(characters: ICharacter[], termSearch: string) {
    if(!characters || !termSearch){
      return characters;
    }else {
      return characters.filter(character =>
        character.species.toLowerCase().includes(termSearch.toLowerCase())
      );
    }
  }
}

