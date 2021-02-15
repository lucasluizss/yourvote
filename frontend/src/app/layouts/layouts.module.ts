import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { PublicLayoutComponent } from './public/public.component';
import { PublicNavComponent } from './public/nav/nav.component';
import { PublicFooterComponent } from './public/footer/footer.component';
import { PublicSidebarComponent } from './public/sidebar/sidebar.component';

import { SecureLayoutComponent } from './secure/secure.component';
import { SecureNavComponent } from './secure/nav/nav.component';
import { SecureFooterComponent } from './secure/footer/footer.component';
import { SecureSidebarComponent } from './secure/sidebar/sidebar.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

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
		CommonModule, 
		RouterModule,
		HttpClientModule,
		TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
	],
})
export class LayoutsModule {}
