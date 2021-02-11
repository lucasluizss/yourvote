import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
	
	constructor(
		private readonly router: Router,
		private readonly authSerivce: AuthService
	) {}

	canActivate() {
		if (!this.authSerivce.user.value) {
			this.router.navigate(['/sign-in']);
			return false;
		}

		return true;
	}
}
