import { Component, OnInit } from '@angular/core';

import UserModel from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'secure-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SecureSidebarComponent implements OnInit {

  public user: UserModel;

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.user.value;
  }
}
