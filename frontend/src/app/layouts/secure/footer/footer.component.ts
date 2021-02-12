import { Component } from '@angular/core';

@Component({
  selector: 'secure-footer',
  templateUrl: './footer.component.html'
})
export class SecureFooterComponent {
  public now = new Date();
}
