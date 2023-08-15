import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShorter'
})
export class TextShorterPipe implements PipeTransform {

  transform(
    text: string,
    value: number
  ): string {
    if(text.length > value) {
      return text.substring(0, value) + '...';
    }
    return text;
  }

}
