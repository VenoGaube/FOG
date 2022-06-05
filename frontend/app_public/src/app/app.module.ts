import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { RouterModule } from '@angular/router';
import { ArticlesOverviewComponent } from './articles-overview/articles-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ArticlesOverviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: '', component: TemplateComponent}, {path: 'articles', component: ArticlesOverviewComponent }]),
  ],
  providers: [],
  bootstrap: [TemplateComponent]
})
export class AppModule { }
