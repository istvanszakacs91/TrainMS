import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'trackNumberFormatter'
})
export class FormatterPipe implements PipeTransform {
  transform(value: string): string {
    if (value != null) {
      //value = value.replace(/[^\d0-9]{2}/g, ' ').replace(/(.{2})/g, '$1 ').trim();
      value = value.replace(/[^\d0-9]{2}/g, ' ').replace(/(.{2})/g, '$1 ').trim();
      //console.log(value);
    }
    return value;
    //50 55 20-05 555-7
  }
}