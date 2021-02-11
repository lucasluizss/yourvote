import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface SignInModel {
	email: string;
	password: string;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user = new BehaviorSubject<any | null>(
		JSON.parse(localStorage.getItem('@YourVote:user'))
	);

	constructor(private readonly http: HttpClient) {}

	setUser(user: any) {
		localStorage.setItem('@YourVote:user', JSON.stringify(user));
		this.user.next(user);
	}

	signIn(request: SignInModel): Observable<any> {
		return this.http.post('/accounts/authenticate', request);
	}

	signOut() {
		this.http.post('/accounts/logout', {});
		localStorage.clear();
	}
}
