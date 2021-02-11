import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PublicLayoutComponent } from './public/public.component';
import { PublicNavComponent } from './public/nav/nav.component';
import { PublicFooterComponent } from './public/footer/footer.component';
import { PublicSidebarComponent } from './public/sidebar/sidebar.component';

import { SecureLayoutComponent } from './secure/secure.component';
import { SecureNavComponent } from './secure/nav/nav.component';
import { SecureFooterComponent } from './secure/footer/footer.component';
import { SecureSidebarComponent } from './secure/sidebar/sidebar.component';

@NgModule({
  declarations: [
    PublicLayoutComponent, 
    PublicNavComponent,
    PublicFooterComponent,
    PublicSidebarComponent,
    SecureLayoutComponent,
    SecureNavComponent,
    SecureFooterComponent,
    SecureSidebarComponent,
  ],
  imports: [
    RouterModule,
  ]
})
export class LayoutsModule { }
