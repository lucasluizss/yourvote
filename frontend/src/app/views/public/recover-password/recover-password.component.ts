import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html'
})
export class RecoverPasswordComponent implements OnInit {

  public form = this.fb.group({
		password: ['', Validators.required],
		confirmedPassword: ['', Validators.required],
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
    
    this.authService.resetPassword(this.form.value).subscribe(response => {
      this.router.navigate(['/sign-in']);
    });
  }
}
