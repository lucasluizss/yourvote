import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<loader></loader>
		<router-outlet></router-outlet>
	`,
})
export class AppComponent {
	title = 'yourvote';
}
