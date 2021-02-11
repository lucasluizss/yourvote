import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import UserModel from '../models/user.model';

interface SignInModel {
	email: string;
	password: string;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public token = new BehaviorSubject<string>(
		window.atob(localStorage.getItem('@YourVote:token'))
	);

	public user = new BehaviorSubject<UserModel | null>(
		JSON.parse(window.atob(localStorage.getItem('@YourVote:user')))
	);

	constructor(private readonly http: HttpClient) {}

	setUser(data: { user: UserModel; token: string }) {
		localStorage.setItem(
			'@YourVote:user',
			window.btoa(JSON.stringify(data.user))
		);
		localStorage.setItem('@YourVote:token', window.btoa(data.token));
		this.token.next(data.token);
		this.user.next(data.user);
	}

	signIn(request: SignInModel): Observable<any> {
		return this.http.post('/accounts/authenticate', request);
	}

	async signOut() {
		await this.http.post('/accounts/logout', {}).toPromise();
		localStorage.clear();
		this.user.next(null);
		this.token.next(null);
	}
}
