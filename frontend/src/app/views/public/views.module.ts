import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

const ROUTES: Routes = [
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'not-found', component: NotFoundComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'recover-password', component: RecoverPasswordComponent },
];

@NgModule({
	declarations: [
		SignInComponent,
		SignUpComponent,
		NotFoundComponent,
		ForgotPasswordComponent,
		RecoverPasswordComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(ROUTES)],
})
export class PublicViewsModule {}
