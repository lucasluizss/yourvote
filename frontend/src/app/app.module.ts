import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { environment } from '../environments/environment';
import { Interceptor } from './app.interceptor';
import { LoaderModule } from './components/loader/loader.module';
import { LoaderInterceptor } from './components/loader/loader.interceptor';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		HttpClientModule,
		LayoutsModule,
		LoaderModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
		{ provide: 'BASE_URL', useValue: environment.baseUrl },
	],
})
export class AppModule {}
