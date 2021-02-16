import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';

const ROUTES: Routes = [
  { path: 'new', component: NewComponent },
  { path: '', component: ListComponent },
];

@NgModule({
  exports: [ListComponent, NewComponent],
  declarations: [ListComponent, NewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class SessionsModule { }
