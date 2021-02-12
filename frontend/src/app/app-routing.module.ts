import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGuard } from './app.guard';
import { PublicLayoutComponent } from './layouts/public/public.component';
import { SecureLayoutComponent } from './layouts/secure/secure.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign-in',
		pathMatch: 'full',
	},
	{
		path: '',
		component: PublicLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () =>
					import('./views/public/views.module').then(
						module => module.PublicViewsModule
					),
			},
		],
	},
	{
		path: '',
		component: SecureLayoutComponent,
		canActivate: [AppGuard],
		children: [
			{
				path: '',
				loadChildren: () =>
					import('./views/secure/views.module').then(
						module => module.SecureViewsModule
					),
			},
		],
	},
	{
		path: '**',
		redirectTo: '/dashboard',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
