import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { LoaderService } from './loader.service';

export class LoaderInterceptor implements HttpInterceptor {
	constructor(private readonly loaderService: LoaderService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		this.loaderService.show();
		return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
	}
}
