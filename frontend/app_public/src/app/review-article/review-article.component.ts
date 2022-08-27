import { Component, OnInit } from '@angular/core';
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";

@Component({
  selector: 'app-review-article',
  templateUrl: './review-article.component.html',
  styleUrls: ['./review-article.component.css']
})
export class ReviewArticleComponent implements OnInit {
  articleSelected: boolean = false;
  selectedAlreadyReviewedArticle:boolean = false;

  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService) { }

  cur_user = new User();
  test(id: number){
    console.log(id)
    this.articleSelected = true;
    if (id==4)
      this.selectedAlreadyReviewedArticle = true;
  }

  reset(){
    this.articleSelected = false;
    this.selectedAlreadyReviewedArticle = false;
  }

  ngOnInit(): void {
    this.sidebarHandling();
  }

  sidebarHandling():void {
    this.mms.account.then((res: string) => {
      this.cur_user=this.dbs.getUserById(res);
      if(this.cur_user.type!="Editor" && this.cur_user.type!="Admin"){
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

}
