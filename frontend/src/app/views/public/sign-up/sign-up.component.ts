import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  public form = this.fb.group({
		username: ['', Validators.required],
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
		phone: ['', Validators.required],
	});

	constructor(
		private readonly fb: FormBuilder,
    private readonly router: Router,
		private readonly authService: AuthService
	) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.authService.signUp(this.form.value).subscribe(response => {
      this.router.navigate(['/sign-in']);
    });
  }
}
