import { Component, OnInit } from '@angular/core';
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";
import {ArticleDao} from "../../assets/classes/ArticleDao";

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService) { }
  cur_user: User=new User();
  articles_approved: ArticleDao[] = [];
  articles_inreview: ArticleDao[] = [];
  articles_rejected: ArticleDao[] = [];
  allArticles = true;
  approvedArticles = false;
  rejectedArticles = false;
  inReviewArticles = false;

  dispAllArticles(): void {
    this.allArticles = true;
    this.approvedArticles = false;
    this.rejectedArticles = false;
    this.inReviewArticles = false;
  }

  dispAppArticles(): void {
    this.allArticles = false;
    this.approvedArticles = true;
    this.rejectedArticles = false;
    this.inReviewArticles = false;
  }

  dispRejArticles(): void {
    this.allArticles = false;
    this.approvedArticles = false;
    this.rejectedArticles = true;
    this.inReviewArticles = false;
  }

  dispRevArticles(): void {
    this.allArticles = false;
    this.approvedArticles = false;
    this.rejectedArticles = false;
    this.inReviewArticles = true;
  }

  ngOnInit(): void {
    this.sidebarHandling();
  }

  deleteArticle(id:string){
    this.dbs.deleteArticle(id);
    this.refresh();
  }

  sidebarHandling():void {
    if(typeof this.mms.account != "string")
      this.mms.account.then((res: string) => {
        this.cur_user=this.dbs.getUserById(res);
        this.refresh()
      })
    else{
      this.cur_user=this.dbs.getUserById(this.mms.account)
      this.refresh()
    }
  }

  refresh(){
    this.articles_approved = this.dbs.getUserApprovedArticles(this.cur_user.user_id)
    this.articles_rejected = this.dbs.getUserRejectedArticles(this.cur_user.user_id)
    this.articles_inreview = this.dbs.getUserInReviewArticles(this.cur_user.user_id)
  }

  redirect(link:string){
    window.open(link);
  }

  onclick(el:any):void {
    el = el as Element
    el = el.parentElement
    //console.log(el)
    if(el.children[1].style.maxHeight=="0px")
      el.children[1].style.maxHeight="500px"
    else
      el.children[1].style.maxHeight="0px"
  }

}
