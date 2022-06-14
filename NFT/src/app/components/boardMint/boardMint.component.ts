import {Component, OnInit} from '@angular/core';
import {WalletService} from "../../../services/WalletService";
import {BoardNFTContract} from "../../../BoardNFTContract";
import {BoardNFT} from "../../models/boardNFT";

@Component({
  selector: 'boardMint',
  templateUrl: './boardMint.component.html',
  styleUrls: ['./boardMint.component.css']
})
export class BoardMintComponent implements OnInit {
  boardNFTContract: BoardNFTContract | undefined;
  boardNFTs: BoardNFT[] | undefined;
  rating: number;
  author: string;
  articleImage: string;

  constructor(private walletService: WalletService) {
    this.rating = 0;
    this.author = "";
    this.articleImage = "";
  }

  ngOnInit(): void {
    this.walletService.initBoard()
      .then(boardNFTContract => {
        this.boardNFTContract = boardNFTContract;
        return this.updateBoardNFTs();
      })
      .catch(err => {
        console.error(err);
      });
  }

  mint() {
    if (this.rating >= 0 && this.rating <= 5) {
      this.boardNFTContract?.boardMint(this.rating)
        .then(() => {
          return this.updateBoardNFTs();
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  updateBoardNFTs(): Promise<any> {
    return this.boardNFTContract?.getOwnedNfts()
      .then((boardNFTs) => {
        this.boardNFTs = boardNFTs;
      }) || Promise.resolve();
  }

  setRating(event: any) {
    this.rating = event.target.value;
  }

  setArticleAuthor(event: any) {
    this.author = event.target.value;
  }
}
