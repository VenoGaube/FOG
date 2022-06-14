import {Injectable} from "@angular/core";
import {WalletService} from "./WalletService";
import {AuthorNFTContract} from "../AuthorNFTContract";
import {AuthorNFTFactoryService} from "./AuthorNFTFactory.service";
import {ReviewerNFTFactoryService} from "./ReviewerNFTFactory.service";
import {BoardNFTFactoryService} from "./BoardNFTFactory.service";
import {BoardNFTContract} from "../BoardNFTContract";
import {ReviewerNFTContract} from "../ReviewerNFTContract";

// @ts-ignore
const ATJson = require('../../truffle/build/contracts/AuthorToken.json');
const BTJson = require('../../truffle/build/contracts/BoardToken.json');
const RTJson = require('../../truffle/build/contracts/ReviewerToken.json');
// @ts-ignore
const Web3 = require('web3')

@Injectable({
  providedIn: 'root',
})
export class Metamask implements WalletService {

  constructor(private authorNFTFactoryService: AuthorNFTFactoryService,
              private reviewerNFTFactoryService: ReviewerNFTFactoryService,
              private boardNFTFactoryService: BoardNFTFactoryService) {
  }

  public async initAuthor(): Promise<AuthorNFTContract> {
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
        const colorsContract = this.initAuthorNFTs(web3, netId, selectedAccount);
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

  private initAuthorNFTs(web3: any, netId: number, selectedAccount: string): AuthorNFTContract {
    const contract  = new web3.eth.Contract(ATJson.abi, ATJson.networks[netId].address);
    return this.authorNFTFactoryService.create(contract , selectedAccount);
  }

  public async initBoard(): Promise<BoardNFTContract> {
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
        const colorsContract = this.initBoardNFTs(web3, netId, selectedAccount);
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

  private initBoardNFTs(web3: any, netId: number, selectedAccount: string): BoardNFTContract {
    const contract  = new web3.eth.Contract(BTJson.abi, BTJson.networks[netId].address);
    return this.boardNFTFactoryService.create(contract , selectedAccount);
  }

  public async initReviewer(): Promise<ReviewerNFTContract> {
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
        const colorsContract = this.initReviewerNFTs(web3, netId, selectedAccount);
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

  private initReviewerNFTs(web3: any, netId: number, selectedAccount: string): ReviewerNFTContract {
    const contract  = new web3.eth.Contract(RTJson.abi, RTJson.networks[netId].address);
    return this.reviewerNFTFactoryService.create(contract , selectedAccount);
  }
}
