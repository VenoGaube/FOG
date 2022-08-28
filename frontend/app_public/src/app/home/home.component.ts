import { Component, OnInit } from '@angular/core';
import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from 'web3';
import {MetamaskServiceService} from "../Services/metamask-service.service";
import {DatabaseService} from "../Services/database.service";
import {User} from "../../assets/classes/User";
declare let require: any;

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor(private mms:MetamaskServiceService, private dbs:DatabaseService) { }
  cur_user: User=new User();

  sidebarHandling():void {
    if(typeof this.mms.account != "string")
      this.mms.account.then((res: string) => {
        this.cur_user=this.dbs.getUserById(res);})
    else
      this.cur_user=this.dbs.getUserById(this.mms.account)
  }
  foundAccount:boolean = false
  public account:any = ""

  vrniUporabnika = async (): Promise<string> => {
    const ethereum = window.ethereum as MetaMaskInpageProvider;
    if (typeof window.ethereum !== "undefined") {
      // Poveži se na MetaMask
      const racuni: any = await ethereum.request({method: "eth_requestAccounts"});
      if (racuni != null) {
        //alert(racuni[0]);
        this.foundAccount = true;
        console.log(racuni[0])
        return racuni[0];
      } else return ""
    } else return "";
  }

  ngOnInit(): void {
    this.account = this.vrniUporabnika();
    this.sidebarHandling();
  }

}
