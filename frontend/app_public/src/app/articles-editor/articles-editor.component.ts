import { Component, OnInit } from '@angular/core';
import {conditionallyCreateMapObjectLiteral} from "@angular/compiler/src/render3/view/util";
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";
import {Article} from "../../assets/classes/Article";
import {ArticleDao} from "../../assets/classes/ArticleDao";
import {Router} from "@angular/router";

@Component({
  selector: 'app-articles-editor',
  templateUrl: './articles-editor.component.html',
  styleUrls: ['./articles-editor.component.css']
})
export class ArticlesEditorComponent implements OnInit {

  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService, private router:Router) { }
  cur_user: User=new User();
  articles_approved: ArticleDao[] = [];
  articles_inreview: ArticleDao[] = [];
  articles_rejected: ArticleDao[] = [];
  allArticles = true;
  approvedArticles = false;
  rejectedArticles = false;
  inReviewArticles = false;

  ngOnInit(): void {
    this.refresh();
  }

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

  navToArt(){
    this.router.navigate(['myarticles'])
  }

  sidebarHandling():void {
    if(typeof this.mms.account != "string")
      this.mms.account.then((res: string) => {
        this.cur_user=this.dbs.getUserById(res);})
    else
      this.cur_user=this.dbs.getUserById(this.mms.account)
  }

  refresh(){
    this.articles_approved = this.dbs.getApprovedArticles();
    this.articles_inreview = this.dbs.getInReviewArticles();
    this.articles_rejected = this.dbs.getRejectedArticles();
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

  approveArticle(id:string){
    this.dbs.approveArticle(id);
    this.refresh();
  }

  rejectArticle(id:string){
    this.dbs.rejectArticle(id);
    this.refresh();
  }

  deleteArticle(id:string){
    this.dbs.deleteArticle(id);
    this.refresh();
  }

}
