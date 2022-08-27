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

  ngOnInit(): void {
    this.sidebarHandling();
    this.articles_approved = this.dbs.getApprovedArticles();
    this.articles_inreview = this.dbs.getInReviewArticles();
    this.articles_rejected = this.dbs.getRejectedArticles();
  }
  sidebarHandling():void {
    this.mms.account.then((res: string) => {
      this.cur_user=this.dbs.getUserById(res);
      if(this.cur_user.type!="Editor" && this.cur_user.type!="Admin"){
        alert("You do not have permission for this feature! You will shortly be redirected.");
        this.router.navigate(['articles']);
        // @ts-ignore
        document.getElementById("rev_link").style.pointerEvents="none";
        // @ts-ignore
        document.getElementById("edi_link").style.pointerEvents="none";
      }
      if(this.cur_user.type == "Guest")
        { // @ts-ignore
          document.getElementById("art_link").style.pointerEvents="none";
        }
      // @ts-ignore
      document.getElementById("user_name").innerText=this.cur_user.name+" "+this.cur_user.surname;

      // @ts-ignore
      document.getElementById("user_rep").innerText=this.cur_user.reputation;
    })
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
    this.ngOnInit();
  }

  rejectArticle(id:string){
    this.dbs.rejectArticle(id);
    this.ngOnInit();
  }

}
