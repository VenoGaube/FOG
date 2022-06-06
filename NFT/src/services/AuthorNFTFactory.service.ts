import {Injectable} from "@angular/core";
import {AuthorNFTContract} from "../AuthorNFTContract";

@Injectable({
  providedIn: 'root',
})
export class AuthorNFTFactoryService {

  public create(rawDJTContract: any, address: string): AuthorNFTContract {
    const authorMint = (title: string) => rawDJTContract.methods.authorMint(title, "Author test", "testni ipfs", 1).send({
      from: address
    });
    const getAuthorNFTData = () => rawDJTContract.methods.getAuthorNFTData(0).call();

    const getOwnedNfts = () => rawDJTContract.methods.getOwnedNfts().call();

    return {authorMint, getAuthorNFTData, getOwnedNfts};
  }
}
