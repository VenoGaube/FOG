import { Component, OnInit } from '@angular/core';
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";
import {ArticleDao} from "../../assets/classes/ArticleDao";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService) { }
  cur_user: User=new User();
  articles: ArticleDao[] = [];

  ngOnInit(): void {
    this.sidebarHandling();
    this.refresh();
  }

   sidebarHandling():void {
     if(typeof this.mms.account != "string")
       this.mms.account.then((res: string) => {
         this.cur_user=this.dbs.getUserById(res);})
     else
       this.cur_user=this.dbs.getUserById(this.mms.account)
   }

  redirect(link:string){
    window.open(link);
  }

   refresh() {
    this.articles=this.dbs.getApprovedArticles();
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

}
