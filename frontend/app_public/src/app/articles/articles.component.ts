import { Component, OnInit } from '@angular/core';
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService) { }
  cur_user: User=new User();

  ngOnInit(): void {
    this.sidebarHandling();
    console.log(this.dbs.getAllArticles());
    this.dbs.makeNewArticle("neki", "hahaha", "bruh", "myass", ".txt");
    console.log(this.dbs.getAllArticles());
  }
   sidebarHandling():void {
     this.mms.account.then((res: string) => {
       this.cur_user=this.dbs.getUserById(res);
       // @ts-ignore
       document.getElementById("user_name").innerText=this.cur_user.name+" "+this.cur_user.surname;

       // @ts-ignore
       document.getElementById("user_rep").innerText=this.cur_user.reputation;
     })
   }

}
