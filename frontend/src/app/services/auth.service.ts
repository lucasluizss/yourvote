import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import UserModel from '../models/user.model';
import { StorageService } from './storage.service';

interface SignInModel {
	email: string;
	password: string;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public token = new BehaviorSubject<string | null>(
		this.storageService.get('@YourVote:token')
	);

	public user = new BehaviorSubject<UserModel | null>(
		this.storageService.get('@YourVote:user')
	);

	constructor(
		private readonly http: HttpClient,
		private readonly storageService: StorageService
	) {}

	setUser(data: { user: UserModel; token: string }) {
		this.storageService.set('@YourVote:user', data.user);
		this.storageService.set('@YourVote:token', data.token);
		this.token.next(data.token);
		this.user.next(data.user);
	}

	signIn(request: SignInModel): Observable<any> {
		return this.http.post('/accounts/authenticate', request);
	}

	async signOut() {
		await this.http.post('/accounts/logout', {}).toPromise();
		this.storageService.clear();
		this.user.next(null);
		this.token.next(null);
	}
}
