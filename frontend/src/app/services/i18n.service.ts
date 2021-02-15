import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  public readonly localeEvent = new Subject<string>();

  constructor(private readonly translate: TranslateService) {
    translate.addLangs(['en', 'es', 'pt']);
		translate.setDefaultLang('en');
  }

  public changeLocale(locale: string) {
    this.translate.use(locale);
    this.localeEvent.next(locale);
  }
}