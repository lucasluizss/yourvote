import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	constructor(private readonly loaderService: LoaderService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		this.loaderService.show();
		return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
	}
}
