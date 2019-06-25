import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {EditComponent} from './edit.component';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {MarkdownModule} from 'ngx-markdown';

const routes: Routes = [
  { path: '', component: EditComponent},
  { path: ':id', component: EditComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    RichTextEditorAllModule,
    FormsModule,
    MarkdownModule
  ],
  exports: [
    RouterModule
  ]
})
export class EditModule { }
