import { Component, OnInit } from '@angular/core';
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {Database} from "@angular/fire/database";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService) { }
  cur_user = new User()

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
