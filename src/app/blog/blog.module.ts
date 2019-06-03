import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: './blog/blog-view.module#BlogViewModule'},
  { path: 'post', loadChildren: './post/blog-post-view.module#BlogPostViewModule'},
  { path: 'edit', loadChildren: './edit/edit.module#EditModule'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    FormsModule
  ],
  exports: [RouterModule]
})
export class BlogModule { }
