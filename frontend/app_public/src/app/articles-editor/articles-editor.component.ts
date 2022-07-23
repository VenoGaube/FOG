import { Component, OnInit } from '@angular/core';
import {conditionallyCreateMapObjectLiteral} from "@angular/compiler/src/render3/view/util";
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";

@Component({
  selector: 'app-articles-editor',
  templateUrl: './articles-editor.component.html',
  styleUrls: ['./articles-editor.component.css']
})
export class ArticlesEditorComponent implements OnInit {

  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService) { }
  cur_user: User=new User();

  ngOnInit(): void {
    this.sidebarHandling();
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

  onclick(el:any):void {
    el = el as Element
    el = el.parentElement
    console.log(el)
    if(el.children[1].style.maxHeight=="0px")
      el.children[1].style.maxHeight="500px"
    else
      el.children[1].style.maxHeight="0px"
  }

}
