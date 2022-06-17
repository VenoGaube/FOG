import { Component, OnInit } from '@angular/core';
import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from 'web3';
declare let require: any;

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor() { }
  foundAccount:boolean = false
  account:any = ""

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
  }

}
