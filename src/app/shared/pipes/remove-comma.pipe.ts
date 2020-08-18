import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeComma'
})
export class RemoveCommaPipe implements PipeTransform {

  transform(value: string): string {
    if (!!value) {
      return value.replace(/,/g, ".");
    } else {
      return "";
    }
  }

}
