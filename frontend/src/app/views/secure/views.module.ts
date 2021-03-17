import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppGuard } from 'src/app/app.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SessionsModule } from './sessions/sessions.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
	return new TranslateHttpLoader(httpClient);
}

const ROUTES: Routes = [
	{ path: 'dashboard', component: DashboardComponent },
	{
		path: '',
    canActivate: [AppGuard],
		children: [
			{
				path: 'sessions',
				loadChildren: () =>
					import('./sessions/sessions.module').then(
						module => module.SessionsModule
					),
			},
		],
	},
];

@NgModule({
	declarations: [DashboardComponent],
	imports: [
		CommonModule,
		SessionsModule,
		RouterModule.forChild(ROUTES),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
	],
})
export class SecureViewsModule {}
