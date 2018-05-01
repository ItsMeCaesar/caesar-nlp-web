import { Pipe, PipeTransform } from '@angular/core';

import { Locale } from '../models';

@Pipe({ name: 'locale' })
export class LocalePipe implements PipeTransform {

  public locales = [
    new Locale('pt_BR', 'Português (BR)'),
    new Locale('en_US', 'English (US)')
  ];

  /**
   * Transform a locale code into a description
   *
   * @param code
   */
  transform(code: string): string {
    return this.locales.find(l => l.code === code).description;
  }

}
