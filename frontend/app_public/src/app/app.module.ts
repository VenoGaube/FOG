import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { ArticlesOverviewComponent } from './articles-overview/articles-overview.component';
import { AppUsmerjanjeModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ArticlesOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppUsmerjanjeModule,
  ],
  providers: [],
  bootstrap: [TemplateComponent]
})
export class AppModule { }
