import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent } from './public/public.component';
import { PublicNavComponent } from './public/nav/nav.component';
import { PublicFooterComponent } from './public/footer/footer.component';
import { PublicSidebarComponent } from './public/sidebar/sidebar.component';

import { SecureComponent } from './secure/secure.component';
import { SecureNavComponent } from './secure/nav/nav.component';
import { SecureFooterComponent } from './secure/footer/footer.component';
import { SecureSidebarComponent } from './secure/sidebar/sidebar.component';

@NgModule({
  declarations: [
    PublicComponent, 
    PublicNavComponent,
    PublicFooterComponent,
    PublicSidebarComponent,
    SecureComponent,
    SecureNavComponent,
    SecureFooterComponent,
    SecureSidebarComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutsModule { }
