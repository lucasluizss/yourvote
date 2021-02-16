import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'public-footer',
	templateUrl: './footer.component.html',
})
export class PublicFooterComponent {
	public now = new Date();
	constructor(public readonly translate: TranslateService) {}
}
