import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'secure-footer',
  templateUrl: './footer.component.html'
})
export class SecureFooterComponent {
  public now = new Date();
  constructor(public readonly translate: TranslateService) {}
}
