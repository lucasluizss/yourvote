import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from 'src/app/services/i18n.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
	constructor(
		public translate: TranslateService,
		private readonly i18nService: I18nService
	) {
		translate.addLangs(['en', 'pt']);
		translate.setDefaultLang('en');

		const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|pt/) ? browserLang : 'en');
	}

	ngOnInit() {
		this.i18nService.localeEvent.subscribe(locale =>
			this.translate.use(locale)
		);
	}
}
