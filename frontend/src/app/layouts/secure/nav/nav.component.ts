import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'secure-nav',
  templateUrl: './nav.component.html'
})
export class SecureNavComponent {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  async onSignOut() {
    await this.authService.signOut();
    this.router.navigate(['sign-in']);
  }
}
