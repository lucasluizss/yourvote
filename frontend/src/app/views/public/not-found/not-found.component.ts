import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {

  public form = this.fb.group({
		search: ['', Validators.required]
	});

  constructor(private readonly fb: FormBuilder) { }

  onSearch() {
    //TODO:: Find available routes to user based on the input
    console.log('We are working on that...');
  }
}
