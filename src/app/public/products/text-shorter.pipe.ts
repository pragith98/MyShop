import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShorter'
})
export class TextShorterPipe implements PipeTransform {

  transform(
    text: string,
    value: number
  ): string {
    return text.length > value ?
      text.substring(0, value) + '...' :
      text;
  }

}
