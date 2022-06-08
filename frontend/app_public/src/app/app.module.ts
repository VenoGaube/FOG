import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { ArticlesOverviewComponent } from './articles-overview/articles-overview.component';
import { AppUsmerjanjeModule } from './app-routing/app-routing.module';
import { SubmitArticleComponent } from './submit-article/submit-article.component';
import { ReviewArticleComponent } from './review-article/review-article.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ArticlesOverviewComponent,
    SubmitArticleComponent,
    ReviewArticleComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppUsmerjanjeModule,
  ],
  providers: [],
  bootstrap: [TemplateComponent]
})
export class AppModule { }
