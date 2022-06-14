import {Component, OnInit} from '@angular/core';
import {WalletService} from '../../../services/WalletService';
import {ReviewerNFTContract} from "../../../ReviewerNFTContract";
import {ReviewerNFT} from "../../models/reviewerNFT";

@Component({
  selector: 'reviewerMint',
  templateUrl: './reviewerMint.component.html',
  styleUrls: ['./reviewerMint.component.css']
})
export class ReviewerMintComponent implements OnInit {
  reviewerNFTContract: ReviewerNFTContract | undefined;
  reviewerNFTs: ReviewerNFT[] | undefined;
  title: string;
  reviewer: string;
  articleData: string;
  articleImage: string;
  rating: number;

  constructor(private walletService: WalletService) {
    this.title = "";
    this.reviewer = "";
    this.articleData = "";
    this.articleImage = "";
    this.rating = 0;
  }

  ngOnInit(): void {
    this.walletService.initReviewer()
      .then(reviewerNFTContract => {
        this.reviewerNFTContract = reviewerNFTContract;
        return this.updateReviewerNFTs();
      })
      .catch(err => {
        console.error(err);
      });
  }

  mint() {
    if (this.title) {
      this.reviewerNFTContract?.reviewerMint(this.title, this.reviewer, this.rating, this.articleData)
        .then(() => {
          return this.updateReviewerNFTs();
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  updateReviewerNFTs(): Promise<any> {
    return this.reviewerNFTContract?.getOwnedReviewerNFTs()
      .then((reviewerNFTs) => {
        this.reviewerNFTs = reviewerNFTs;
      }) || Promise.resolve();
  }

  setArticleTitle(event: any) {
    this.title = event.target.value;
  }

  setArticleReviewer(event: any) {
    this.reviewer = event.target.value;
  }

  setArticleData(event: any) {
    this.articleData = event.target.value;
  }

  setArticleRating(event: any) {
    this.rating = event.target.value;
  }
}
