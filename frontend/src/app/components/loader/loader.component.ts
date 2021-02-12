import { Component } from '@angular/core';

import { LoaderService } from './loader.service';

@Component({
	selector: 'loader',
	template: '<ngx-loading [show]="loading | async"></ngx-loading>',
})
export class LoaderComponent {
	public loading = this.loaderService.isLoading;
	constructor(private readonly loaderService: LoaderService) {}
}
