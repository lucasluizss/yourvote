import { tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './services/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

	constructor(
		private readonly router: Router,
		private readonly authService: AuthService,
		@Inject('BASE_URL') private readonly baseUrl: string,
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler) {
		const token = '';

		const requestClone = request.clone({ 
			setHeaders: { Authorization: `Bearer ${token}` },
			url: `${this.baseUrl}/${request.url}` 
		});

		return next.handle(requestClone).pipe(tap(null, error => this.handleError(error)));
	}

	handleError(err: HttpErrorResponse) {
		switch (err.status) {
			case 408:
				console.error(`Server was disconnected unexpectedly.`);
				this.router.navigate(['/dashboard']);
				break;
		}
	}
}