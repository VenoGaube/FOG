import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesOverviewComponent } from '../articles-overview/articles-overview.component'
import { SubmitArticleComponent } from '../submit-article/submit-article.component';
import { ReviewArticleComponent } from '../review-article/review-article.component';
import { HomeComponent } from '../home/home.component';

const poti: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesOverviewComponent },
  { path: 'submit', component: SubmitArticleComponent },
  { path: 'review', component: ReviewArticleComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(poti)],
  exports: [RouterModule],
})
export class AppUsmerjanjeModule {}