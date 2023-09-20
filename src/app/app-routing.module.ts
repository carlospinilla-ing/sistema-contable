import { NgModule } from '@angular/core';
import { Routes,RouterModule  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestListComponent } from './test-list/test-list.component';

const routes: Routes = [
  { path: 'tests', component: TestListComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
