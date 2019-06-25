import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BlogViewComponent} from './blog-view.component';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';

const routes: Routes = [
  { path: '', component: BlogViewComponent}
];

@NgModule({
  declarations: [ BlogViewComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MarkdownModule.forChild()
  ],
  exports: [RouterModule]
})
export class BlogViewModule { }
