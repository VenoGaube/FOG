import {Injectable} from "@angular/core";
import {WalletService} from "./WalletService";
import {AuthorNFTContract} from "../AuthorNFTContract";
import {AuthorNFTFactoryService} from "./AuthorNFTFactory.service";

// @ts-ignore
const DJTJson = require('../../truffle/build/contracts/DecenterJournalToken.json');
// @ts-ignore
const Web3 = require('web3')

@Injectable({
  providedIn: 'root',
})
export class Metamask implements WalletService {

  constructor(private authorNFTFactoryService: AuthorNFTFactoryService) {
  }

  public async init(): Promise<AuthorNFTContract> {
    let errMsg;

    // @ts-ignore
    const ethereum = window.ethereum;
    if (typeof ethereum !== 'undefined') {
      const web3 = new Web3(ethereum);
      await ethereum.enable();
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();
      const selectedAccount = accounts[0];

      if (typeof selectedAccount !== 'undefined') {
        console.log(selectedAccount);
        const colorsContract = this.initColors(web3, netId, selectedAccount);
        return Promise.resolve(colorsContract);
      } else {
        errMsg = 'Please login with MetaMask and connect the account to this site.';
        alert(errMsg);
        return Promise.reject({msg: errMsg});
      }
    } else {
      errMsg = 'Enable Metamask!';
      alert(errMsg);
      return Promise.reject({msg: errMsg});
    }
  }

  private initColors(web3: any, netId: number, selectedAccount: string): AuthorNFTContract {
    const rawColorsContract = new web3.eth.Contract(DJTJson.abi, DJTJson.networks[netId].address);
    return this.authorNFTFactoryService.create(rawColorsContract, selectedAccount);
  }
}
