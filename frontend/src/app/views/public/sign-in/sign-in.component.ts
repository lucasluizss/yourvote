import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
	public form = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
		remember: [''],
	});

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly authService: AuthService
	) {}

	ngOnInit(): void {
		if (this.authService.user.value) {
			this.router.navigate(['/dashboard']);
		}

		const credentials = JSON.parse(
			window.atob(sessionStorage.getItem('@YourVote:remember'))
		);

		if (credentials) {
			this.form.patchValue({
				email: credentials.email,
				password: credentials.password,
				remember: true,
			});
		}
	}

	onSignInSubmit() {
		if (this.form.valid) {
			const { email, password, remember } = this.form.value;

			if (remember) {
				sessionStorage.setItem(
					'@YourVote:remember',
					window.btoa(JSON.stringify({ email, password }))
				);
			} else {
        localStorage.removeItem('@YourVote:remember');
      }

			this.authService.signIn({ email, password }).subscribe(
				({ successed, data }) => {
					if (successed) {
						this.authService.setUser(data);
						this.router.navigate(['/dashboard']);
					}
				},
				error => {
					console.error(error.message);
				}
			);
		} else {
			alert('fields are required');
		}
	}
}
