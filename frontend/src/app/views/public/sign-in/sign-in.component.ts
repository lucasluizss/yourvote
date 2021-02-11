import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.user.value) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSignInSubmit() {
    if (this.form.valid) {
      this.authService.signIn(this.form.value).subscribe(({successed, data}) => {
        if (successed) {
          this.authService.setUser(data);
          this.router.navigate(['/dashboard']);
        }
      }, error => {
        
        console.error(error.message);
      });
    } else {
      alert('fields are required');
    }
  }

}
