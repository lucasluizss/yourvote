import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styles: [],
})
export class ForgotPasswordComponent implements OnInit {
	public form = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
	});

	constructor(private readonly fb: FormBuilder) {}

	ngOnInit(): void {}

	onSubmit() {}
}
