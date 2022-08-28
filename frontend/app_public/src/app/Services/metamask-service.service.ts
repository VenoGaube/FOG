import { Injectable } from '@angular/core';
import {MetaMaskInpageProvider} from "@metamask/providers";

@Injectable({
  providedIn: 'root'
})
export class MetamaskServiceService {

  constructor() {
    this.account = this.vrniUporabnika();
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
        //console.log(racuni[0])
        this.account = racuni[0];
        console.log(racuni[0])
        return racuni[0];
      } else return ""
    } else return "";
  }

  public getUser(): any {
    this.vrniUporabnika();
    return this.account;
  }

}
