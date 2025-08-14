import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minLength'
})
export class MinLengthPipe implements PipeTransform {

  transform(value: string | null | undefined, length: number): boolean {
    if (!value) return false;
    return value.length >= length;
  }

}
