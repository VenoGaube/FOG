import {ReviewerNFT} from "./app/models/reviewerNFT";

export interface ReviewerNFTContract {
  reviewerMint: (title: string, reviewer: string, rating: number, ipfsArticleLink: string) => Promise<any>;
  getReviewerNFTData: (tokenId: number) => Promise<ReviewerNFT>;
  getOwnedReviewerNFTs:() => Promise<ReviewerNFT[]>;
  tokenURI:(tokenId: number) => string;
}
