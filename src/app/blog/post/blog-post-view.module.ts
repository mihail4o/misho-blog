import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogPostViewComponent } from './blog-post-view.component';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';

const routes: Routes = [
  { path: '', component: BlogPostViewComponent},
  { path: ':id', component: BlogPostViewComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [BlogPostViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MarkdownModule.forChild()
  ],
  exports: [RouterModule]
})
export class BlogPostViewModule { }
