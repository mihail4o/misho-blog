import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { LayoutModule } from '@angular/cdk/layout';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import {MarkdownModule} from 'ngx-markdown';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import {BlogModule} from './blog/blog.module';
import {environment} from '../environments/environment';
import {AppService} from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    DashboardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    BlogModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ScrollToModule.forRoot(),
    CloudinaryModule.forRoot(Cloudinary, {cloud_name: 'balivo'}),
    HttpClientModule,
    RichTextEditorAllModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
