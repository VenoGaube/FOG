import {Injectable} from "@angular/core";
import {ReviewerNFTContract} from "../ReviewerNFTContract";

@Injectable({
  providedIn: 'root',
})
export class ReviewerNFTFactoryService {

  public create(rawRTContract: any, address: string): ReviewerNFTContract {
    const reviewerMint = (title: string, reviewer: string, rating: number, articleData: string) => rawRTContract.methods.reviewerMint(title, reviewer, rating, articleData).send({
      from: address
    });
    const getReviewerNFTData = (tokenId: number) => rawRTContract.methods.getReviewerNFTData(tokenId).call();

    const getOwnedReviewerNFTs = () => rawRTContract.methods.getOwnedReviewerNFTs().call();

    const tokenURI = (tokenId: number) => rawRTContract.methods.tokenURI(tokenId).call();

    return {reviewerMint, getReviewerNFTData, getOwnedReviewerNFTs, tokenURI};
  }
}
