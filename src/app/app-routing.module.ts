import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';



const appRotes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'blog', loadChildren: './blog/blog.module#BlogModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRotes, { preloadingStrategy: PreloadAllModules} )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
