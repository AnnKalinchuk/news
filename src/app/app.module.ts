import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { ArticleComponent } from './news-page/article/article.component';
import { ArticlePageComponent } from './news-page/article-page/article-page.component';
import { CustomReuseStrategy } from './shared/routing';
import { RouteReuseStrategy } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    NewsPageComponent,
    ArticleComponent,
    ArticlePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
