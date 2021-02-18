import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styles: [],
})
export class ForgotPasswordComponent implements OnInit {
	public form = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
	});

	constructor(
		private readonly fb: FormBuilder,
		private readonly authService: AuthService
	) {}

	ngOnInit(): void {}

	onSubmit() {
		this.authService.forgotPassword(this.form.value).subscribe(response => {
			alert('You have received an url to reset your password!');
		});
	}
}
