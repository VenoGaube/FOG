import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MyArticlesComponent } from '../my-articles/my-articles.component'
import { SubmitArticleComponent } from '../submit-article/submit-article.component';
import { ReviewArticleComponent } from '../review-article/review-article.component';
import { HomeComponent } from '../home/home.component';
import { NftsComponent } from '../nfts/nfts.component';
import { ArticlesComponent } from '../articles/articles.component';
import { ArticlesEditorComponent} from "../articles-editor/articles-editor.component";

const poti: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'myarticles', component: MyArticlesComponent },
  { path: 'submit', component: SubmitArticleComponent },
  { path: 'review', component: ReviewArticleComponent },
  { path: 'nfts', component: NftsComponent },
  { path: 'articles-editor', component: ArticlesEditorComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(poti)],
  exports: [RouterModule],
})
export class AppUsmerjanjeModule {}
