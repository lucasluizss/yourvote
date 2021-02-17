import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';

const ROUTES: Routes = [
  { path: 'show', component: ShowComponent },
  { path: 'new', component: NewComponent },
  { path: '', component: ListComponent },
];

@NgModule({
  exports: [ListComponent, NewComponent, ShowComponent],
  declarations: [ListComponent, NewComponent, ShowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class SessionsModule { }
