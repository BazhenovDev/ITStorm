import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogComponent} from "./blog/blog.component";
import {ArticleComponent} from "./article/article.component";

const routes: Routes = [
  {path: 'articles', component: BlogComponent, title: 'ITStorm | Блог статей'},
  {path: 'articles/:url', component: ArticleComponent, title: `ITStorm | Статья`}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
