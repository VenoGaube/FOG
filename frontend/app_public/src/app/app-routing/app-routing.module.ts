import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesOverviewComponent } from '../articles-overview/articles-overview.component'
import { TemplateComponent } from '../template/template.component';

const poti: Routes = [
  { path: '', component: TemplateComponent },
  { path: 'articles', component: ArticlesOverviewComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(poti)],
  exports: [RouterModule],
})
export class AppUsmerjanjeModule {}