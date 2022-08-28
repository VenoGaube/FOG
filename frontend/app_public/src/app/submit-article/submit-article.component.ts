import { Component, OnInit } from '@angular/core';
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-submit-article',
  templateUrl: './submit-article.component.html',
  styleUrls: ['./submit-article.component.css']
})
export class SubmitArticleComponent implements OnInit {

  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService, private router:Router) { }
  cur_user:User = new User();
  date:Date = new Date();

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
  onSubmitClick(form:any){
    let ye = new Intl.DateTimeFormat('si', { year: 'numeric' }).format(this.date);
    let mo = new Intl.DateTimeFormat('si', { month: '2-digit' }).format(this.date);
    let da = new Intl.DateTimeFormat('si', { day: '2-digit' }).format(this.date);
    this.dbs.makeNewArticle(form.title, form.summary, this.cur_user.user_id, "", form.file,
      `${da}${mo}.${ye}`)
    this.router.navigate(['articles'])
  }

}
