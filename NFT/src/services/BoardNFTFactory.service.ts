import {Injectable} from "@angular/core";
import {BoardNFTContract} from "../BoardNFTContract";

@Injectable({
  providedIn: 'root',
})
export class BoardNFTFactoryService {

  public create(rawBTContract: any, address: string): BoardNFTContract {
    const boardMint = (rating: number) => rawBTContract.methods.boardMint(rating).send({
      from: address
    });
    const getBoardNFTData = (tokenId: number) => rawBTContract.methods.getBoardNFTData(tokenId).call();

    const getOwnedNfts = () => rawBTContract.methods.getOwnedNfts().call();

    const tokenURI = (tokenId: number) => rawBTContract.methods.tokenURI(tokenId).call();

    return {boardMint, getBoardNFTData, getOwnedNfts, tokenURI};
  }
}
