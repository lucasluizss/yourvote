import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from './services/i18n.service';

@Component({
	selector: 'app-root',
	template: `
		<loader></loader>
		<router-outlet></router-outlet>
	`,
})
export class AppComponent implements OnInit {
	title = 'yourvote';

	constructor(
		public translate: TranslateService,
		private readonly i18nService: I18nService,
	) {
		translate.setDefaultLang('en');
		const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|es|pt/) ? browserLang : 'en');
	}

	ngOnInit() {
		this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));
	}
}
