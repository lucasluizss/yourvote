import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
	canActivate() {
		return true;
	}
}
