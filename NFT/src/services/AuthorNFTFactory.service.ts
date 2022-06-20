import {Injectable} from "@angular/core";
import {AuthorNFTContract} from "../AuthorNFTContract";

@Injectable({
  providedIn: 'root',
})
export class AuthorNFTFactoryService {

  public create(rawDJTContract: any, address: string): AuthorNFTContract {
    const authorMint = (title: string, author: string, articleData: string) => rawDJTContract.methods.authorMint(title, author, articleData).send({
      from: address
    });
    const getAuthorNFTData = (tokenId: number) => rawDJTContract.methods.getAuthorNFTData(tokenId).call();

    const getOwnedNfts = () => rawDJTContract.methods.getOwnedNfts().call();

    const tokenURI = (tokenId: number) => rawDJTContract.methods.tokenURI(tokenId).call();

    return {authorMint, getAuthorNFTData, getOwnedNfts, tokenURI};
  }
}
