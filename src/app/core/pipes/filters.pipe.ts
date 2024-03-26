import { Pipe, PipeTransform } from '@angular/core';
import { Notedata } from '../interfaces/notedata';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(note: any[], value: string): any[] {
    return note.filter((note)=>note.title.toLowerCase().includes(value.toLocaleLowerCase()))
  }

}
