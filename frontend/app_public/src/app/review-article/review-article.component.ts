import { Component, OnInit } from '@angular/core';
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";
import {ArticleDao} from "../../assets/classes/ArticleDao";
import {auditTime} from "rxjs";

@Component({
  selector: 'app-review-article',
  templateUrl: './review-article.component.html',
  styleUrls: ['./review-article.component.css']
})
export class ReviewArticleComponent implements OnInit {
  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService) { }

  cur_user = new User();
  articlesForReview:ArticleDao[] = [];
  articlesReviewed:ArticleDao[] = [];
  articleSelected: boolean = false;
  articleSelectedDAO:ArticleDao = new ArticleDao();
  selectedAlreadyReviewedArticle:boolean = false;
  selectedAlreadyReviewedArticleDAO:ArticleDao = new ArticleDao();
  toReview: boolean = true;
  reviewed: boolean = false;

  displayToReview(){
    this.toReview = true;
    this.reviewed = false;
    this.articleSelected = false;
    this.selectedAlreadyReviewedArticle = false;
  }

  displayReviewed(){
    this.toReview = false;
    this.reviewed = true;
    this.articleSelected = false;
    this.selectedAlreadyReviewedArticle = false;
  }


  test(id: number){
    console.log(id)
    this.articleSelected = true;
    if (id==4)
      this.selectedAlreadyReviewedArticle = true;
  }

  displayReviewedArticle(articleId:string){
    this.selectedAlreadyReviewedArticleDAO = this.dbs.getArticleDAOById(articleId)
    this.selectedAlreadyReviewedArticle = true;
    this.articleSelected = true;
  }

  displayArticleForReview(articleId:string){
    this.articleSelectedDAO = this.dbs.getArticleDAOById(articleId)
    this.selectedAlreadyReviewedArticle = false;
    this.articleSelected = true;
    console.log(this.articleSelectedDAO)
  }

  redirect(link:string){
    window.open(link);
  }

  average(arr: any){
    if(arr.length>0){
      let avg = 0;
      for(let a of arr){
        avg = avg+a;
      }
      avg=avg/arr.length
      avg = Math.floor(avg);
      return Array(avg).keys();
    }
    else
      return Array(0).keys();
  }

  averageNot(arr: any){
    if(arr.length>1){
      let avg = 0;
      for(let a of arr){
        avg = avg+a;
      }
      avg=avg/arr.length
      avg = Math.floor(avg);
      return Array(5-avg).keys();
    }
    else
      return Array(5).keys();
  }

  reset(){
    this.articleSelected = false;
    this.selectedAlreadyReviewedArticle = false;
  }

  ngOnInit(): void {
    this.sidebarHandling();
  }

  sidebarHandling():void {
    if(typeof this.mms.account != "string")
      this.mms.account.then((res: string) => {
        this.cur_user=this.dbs.getUserById(res);
        this.articlesForReview=this.dbs.getArticlesForReviewer(this.cur_user.user_id);
        this.articlesReviewed = this.dbs.getArticlesReviewedByReviewer(this.cur_user.user_id);
      })
    else
      this.cur_user=this.dbs.getUserById(this.mms.account)
    this.articlesForReview=this.dbs.getArticlesForReviewer(this.cur_user.user_id);
    this.articlesReviewed = this.dbs.getArticlesReviewedByReviewer(this.cur_user.user_id);
  }

}
