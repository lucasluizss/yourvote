import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';

import { LoaderComponent } from './loader.component';

@NgModule({
	exports: [LoaderComponent],
	declarations: [LoaderComponent],
	imports: [
		CommonModule,
		NgxLoadingModule.forRoot({
			fullScreenBackdrop: true,
		}),
	],
})
export class LoaderModule {}
