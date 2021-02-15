import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from 'src/app/services/auth.service';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'secure-nav',
  templateUrl: './nav.component.html'
})
export class SecureNavComponent implements OnInit {

  public flag: string = 'us';
	private readonly flagDictionary = {
		'en': 'us',
		'pt': 'br'
	}

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly i18nService: I18nService,
    public readonly translate: TranslateService,
  ) {
    const browserLang = translate.getBrowserLang();
		translate.setDefaultLang(browserLang);
		const useLanguage = browserLang.match(/en|es|pt/) ? browserLang : 'en';
		this.flag = this.flagDictionary[useLanguage];
		translate.use(useLanguage);
  }

  ngOnInit() {
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));
  }

  async onSignOut() {
    await this.authService.signOut();
    this.router.navigate(['sign-in']);
  }

  changeLanguage(language: string) {
		this.flag = this.flagDictionary[language];
		this.i18nService.changeLocale(language);
	}
}
