import { Component, OnInit } from '@angular/core';
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";

@Component({
  selector: 'app-submit-article',
  templateUrl: './submit-article.component.html',
  styleUrls: ['./submit-article.component.css']
})
export class SubmitArticleComponent implements OnInit {

  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService) { }
  cur_user:User = new User();
  ngOnInit(): void {
    this.sidebarHandling();
  }
  sidebarHandling():void {
    if(typeof this.mms.account != "string")
      this.mms.account.then((res: string) => {
        this.cur_user=this.dbs.getUserById(res);})
    else
      this.cur_user=this.dbs.getUserById(this.mms.account)
  }

}
