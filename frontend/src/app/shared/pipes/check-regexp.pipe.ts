import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkRegex'
})
export class CheckRegExpPipe implements PipeTransform {

  transform(value: string | null | undefined, pattern: string): boolean {
    if (!value) return false;
    return new RegExp(pattern).test(value);
  }

}
